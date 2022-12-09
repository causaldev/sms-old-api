import _ from 'lodash';
import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import GradeService from 'app/modules/academic/grade/gradeService';
import GradeStudentService from 'app/modules/academic/gradeStudent/gradeStudentService';
import { transactify } from 'app/services/utils';
import CstService from '../../cst/cstService';
import Quarter from '../../quarter/quarter';
import Semester from '../../semester/semester';
import Rcq from '../rcq/rcq';
import RcsService from '../rcs/rcsService';
import RcyCstRepo from '../rcyCst/rcyCstRepo';
import ReportCardService from '../reportCardService';
import Rcy from './rcy';
import RcyRepo from './rcyRepo';

export default class RcyService extends ReportCardService<Rcy> {
  protected rcyCstRepo: RcyCstRepo;

  constructor(
    protected gradeService = new GradeService(),
    protected gsService = new GradeStudentService(),
    protected cstService = new CstService()
  ) {
    super(new RcyRepo());
    this.rcyCstRepo = new RcyCstRepo();
  }

  async fetchStudentReport(gradeStudentId: string) {
    const report = await (this.repo as RcyRepo).fetchReportCard(gradeStudentId);

    return report?.serialize();
  }

  formatStudentReport(item: any) {
    const mappedData = {
      Total: {},
      Average: {},
      Rank: {},
    };

    if (_.isEmpty(item)) return mappedData;

    const {
      total_score: totalScore,
      average,
      rank,
      academicYear: { year },
    } = item;

    mappedData.Total[year] = totalScore;
    mappedData.Average[year] = average;
    mappedData.Rank[year] = rank;

    return mappedData;
  }

  async updateRank(gradeId: string, academicYearId: string) {
    await transactify(async () => {
      const rcys = await (this.repo as RcyRepo).fetchGradeYearCards(
        gradeId,
        academicYearId
      );
      const rankMap = this.calculateRank(rcys);
      await (this.repo as RcyRepo).updateRank(rcys as Rcy[], rankMap);
    });
  }

  async generateReportStudent(
    gsId: string,
    yearId: string,
    markMap: Record<string, number>
  ) {
    const subjectCount = Object.keys(markMap).length;

    if (subjectCount) {
      const totalMark = Object.values(markMap).reduce((a, b) => a + b);
      const rcy = await Rcy.updateOrCreate(
        {
          grade_student_id: gsId,
          academic_year_id: yearId,
        },
        {
          subject_count: subjectCount,
          total_score: totalMark,
          average: totalMark / subjectCount,
          rank: null,
          finalize_date: null,
          finalized: false,
        }
      );
      await this.rcyCstRepo.createOrUpdate(markMap, rcy.id);
    }
  }

  async generateReportGrade(gradeId: string, yearId: string) {
    const year = await AcademicYearService.getActive();
    const gsIds = (
      await this.gsService.currentRegisteredActiveGradeStudents(gradeId)
    ).map((item) => item.id);
    await Rcy.query()
      .whereHas('gradeStudent', (gsBuilder) => {
        gsBuilder.where('grade_id', gradeId).where('academic_year_id', year.id);
      })
      .where('academic_year_id', year.id)
      .delete();
    const { mark } = await this.getCstMap(gradeId);

    await transactify(async () => {
      for (let i = 0; i < gsIds.length; i++) {
        await this.generateReportStudent(
          gsIds[i],
          yearId,
          mark[gsIds[i]] || {}
        );
      }
    });
  }

  async getSemesterCsts(gradeId: string) {
    const semesters = await Semester.query();
    const rcsService = new RcsService();
    const markMap: any = {};

    for (let i = 0; i < semesters.length; i++) {
      const { mark } = await rcsService.getCstMap(gradeId, semesters[i].id);

      Object.keys(mark).forEach((gsId) => {
        if (markMap[gsId] === undefined) {
          markMap[gsId] = {};
        }

        Object.keys(mark[gsId]).forEach((cstId) => {
          if (markMap[gsId][cstId] === undefined) {
            markMap[gsId][cstId] = {};
          }
          markMap[gsId][cstId][semesters[i].id] = mark[gsId][cstId];
        });

        //
      });
    }

    return markMap;
  }

  async getSemesterCstsAll(gradeId: string) {
    const semesters = await Semester.query();
    const rcsService = new RcsService();
    const markMap: any = {};

    for (let i = 0; i < semesters.length; i++) {
      const { markAll: mark } = await rcsService.getCstMap(
        gradeId,
        semesters[i].id
      );

      Object.keys(mark).forEach((gsId) => {
        if (markMap[gsId] === undefined) {
          markMap[gsId] = {};
        }

        Object.keys(mark[gsId]).forEach((cstId) => {
          if (markMap[gsId][cstId] === undefined) {
            markMap[gsId][cstId] = {};
          }
          markMap[gsId][cstId][semesters[i].id] = mark[gsId][cstId];
        });

        //
      });
    }

    return markMap;
  }

  async getCstMap(gradeId: string) {
    const year = await AcademicYearService.getActive();
    const semesterIds = (await Semester.query()).map((s) => s.id);
    const quarterIds = (await Quarter.query()).map((q) => q.id);

    const rcqs = await Rcq.query().whereHas('gradeStudent', (gsBuilder) => {
      gsBuilder.where('grade_id', gradeId).where('academic_year_id', year.id);
    });

    const students = await this.gsService.currentRegisteredActiveStudents(
      gradeId
    );
    const gsIds = (
      await this.gsService.currentRegisteredActiveGradeStudents(gradeId)
    ).map((i) => i.id);

    const semesters = await Semester.query()
      .orderBy('semester', 'asc')
      .preload('quarters', (qBuilder) => {
        qBuilder.orderBy('quarter', 'asc');
      });
    const semesterMarkMap = await this.getSemesterCsts(gradeId);
    const semesterMarkMapAll = await this.getSemesterCstsAll(gradeId);

    const rcqMap = await this.fetchRcqs(quarterIds, gsIds);
    const rcsMap = await this.fetchRcss(semesterIds, gsIds);

    const csts = await this.cstService.getGradeYearCST(gradeId);
    const marklistMap = this.parseQuarterMarkList(students, csts, rcqs);
    const mark = this.calculateMark(marklistMap);

    const cstsAll = await this.cstService.getGradeYearCSTAll(gradeId);
    const marklistMapAll = this.parseQuarterMarkList(students, cstsAll, rcqs);
    const markAll = this.calculateMark(marklistMapAll);

    return {
      csts,
      marklistMap,
      marklistMapAll,
      mark,
      students,
      rcqs,
      semesters,
      semesterMarkMap,
      semesterMarkMapAll,
      rcqMap,
      rcsMap,
      cstsAll,
      markAll,
    };
  }

  // TODO: Add unit test
  async getYearGrade(gradeId: string) {
    const year = await AcademicYearService.getActive();
    const grade = await this.gradeService.findOne(gradeId);

    const rcys = await Rcy.query()
      .whereHas('gradeStudent', (gsBuilder) => {
        gsBuilder.where('grade_id', gradeId).where('academic_year_id', year.id);
      })
      .where('academic_year_id', year.id);

    const {
      cstsAll: csts,
      marklistMapAll: marklistMap,
      markAll: mark,
      students,
      semesters,
      semesterMarkMapAll: semesterMarkMap,
      rcqMap,
      rcsMap,
    } = await this.getCstMap(gradeId);

    return {
      rcsMap,
      rcqMap,
      semesterMarkMap,
      semesters,
      marklistMap,
      mark,
      grade,
      year,
      rcys,
      students,
      csts,
    };
  }
}
