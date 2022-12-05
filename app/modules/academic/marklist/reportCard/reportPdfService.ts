import { quarterMap } from 'app/modules/_shared/types';
import { generateHtmlReport } from 'app/services/pdf/reportHtmlGenerator';
import { mergeKeyedObjects } from 'app/services/utils';
import AcademicYear from '../../academicYear/academicYear';
import GradeStudentRepo from '../../gradeStudent/gradeStudentRepo';
import GradeStudentService from '../../gradeStudent/gradeStudentService';
import Cst from '../cst/cst';
import SubjectService from '../subject/subjectService';
import RcqService from './rcq/rcqService';
import RcqCstService from './rcqCst/rcqCstService';
import RcsService from './rcs/rcsService';
import RcsCstService from './rcsCst/rcsCstService';
import RcyService from './rcy/rcyService';
import RcyCstService from './rcyCst/rcyCstService';

const promotionMap = {
  'Grade 7': 'Grade 8',
  'Nursery-C': 'LKG',
  'Grade 8': 'Grade 9',
  'UKG-A': 'Grade 1',
  'UKG-B': 'Grade 1',
  'Nursery-B': 'LKG',
  'Grade 1-B': 'Grade 2',
  'Nursery-A': 'LKG',
  'Grade 4': 'Grade 5',
  'Grade 5': 'Grade 6',
  'Grade 3': 'Grade 4',
  'LKG': 'UKG',
  'Grade 9': 'Grade 10',
  'Grade 6': 'Grade 7',
  'Grade 1-A': 'Grade 2',
  'Grade 2': 'Grade 3',
  'Grade 10': 'Grade 11',
};

export default class ReportPdfService {
  constructor(
    protected rcqService = new RcqService(),
    protected rcsService = new RcsService(),
    protected rcyService = new RcyService(),
    protected gsService = new GradeStudentService()
  ) {}

  async fetchNonRankQ(gsId: string) {
    const cstQuery = await Cst.query()
      .whereHas('grade', (gBuilder) => {
        gBuilder.whereHas('gradeStudents', (gsBuilder) => {
          gsBuilder.where('id', gsId);
        });
      })
      .whereHas('subject', (subBuilder) => {
        subBuilder.where('consider_for_rank', false);
      })
      .preload('grade', (gBuilder) => {
        gBuilder.preload('gradeStudents', (gsBuilder) => {
          gsBuilder.where('id', gsId).preload('student');
        });
      })
      .preload('evaluationMethods', (emBuilder) => {
        emBuilder.preload('quarter').preload('smls', (smlBuilder) => {
          smlBuilder.where('grade_student_id', gsId);
        });
      })
      .preload('subject');

    const csts = cstQuery.map((item) => item.serialize());

    const subMap = {};

    csts.forEach((cst) => {
      const {
        subject: { subject },
        evaluationMethods,
      } = cst;
      if (subMap[subject] === undefined) {
        subMap[subject] = {};
      }

      evaluationMethods.forEach((em) => {
        const {
          quarter: { quarter },
          smls,
        } = em;
        let totalScore = 0;
        if (smls.length) {
          smls.forEach((sml) => (totalScore += sml.score));
          subMap[subject][quarterMap[quarter]] = totalScore;
        }
      });
    });

    const year = (await AcademicYear.getActiveYear()).year;

    Object.keys(subMap).forEach((subject) => {
      const { q1, q2, q3, q4 } = subMap[subject];
      let s1 = 0;
      let s1Devisor = 0;

      let s2 = 0;
      let s2Devisor = 0;

      let yr = 0;
      let yrDevisor = 0;

      if (q1) {
        s1 += subMap[subject].q1;
        yr += subMap[subject].q1;
        s1Devisor++;
        yrDevisor++;
      }
      if (q2) {
        s1 += subMap[subject].q2;
        yr += subMap[subject].q2;
        s1Devisor++;
        yrDevisor++;
      }
      if (q3) {
        s2 += subMap[subject].q3;
        yr += subMap[subject].q3;
        s2Devisor++;
        yrDevisor++;
      }
      if (q4) {
        s2 += subMap[subject].q4;
        yr += subMap[subject].q4;
        s2Devisor++;
        yrDevisor++;
      }

      if (s1Devisor) {
        subMap[subject].s1 = s1 / s1Devisor;
      }

      if (s2Devisor) {
        subMap[subject].s2 = s2 / s2Devisor;
      }

      if (yrDevisor) {
        subMap[subject][year] = yr / yrDevisor;
      }
    });

    // console.log(subMap);

    // console.log(JSON.stringify(csts, null, 2));
    return subMap;
  }

  async fetchStudentData(gsId: string, subjects: string[]) {
    const quarterSubjects = await new RcqCstService().fetchFormattedData(gsId);
    const quarterNonRankSubs = await this.fetchNonRankQ(gsId);
    const quarterReport = this.rcqService.formatStudentReport(
      await this.rcqService.fetchStudentReport(gsId)
    );

    const semesterSubjects = await new RcsCstService().fetchFormattedData(gsId);
    const semesterReport = this.rcsService.formatStudentReport(
      await this.rcsService.fetchStudentReport(gsId)
    );

    const yearSubjects = await new RcyCstService().fetchFormattedData(gsId);
    const yearReport = this.rcyService.formatStudentReport(
      (await this.rcyService.fetchStudentReport(gsId)) || {}
    );

    const gsRepo = new GradeStudentRepo();
    const studentData = await gsRepo.fetchStudentReport(gsId);
    const conducts = await gsRepo.fetchConducts(gsId);

    const skills = await this.gsService.fetchSkill(gsId);

    return {
      marklist: {
        subjects: mergeKeyedObjects(subjects, [
          { ...quarterSubjects, ...quarterNonRankSubs },
          semesterSubjects,
          yearSubjects,
        ]),
        ...mergeKeyedObjects(
          ['Total', 'Average', 'Rank'],
          [quarterReport, semesterReport, yearReport]
        ),
        Conduct: conducts,
      },
      skills,
      studentData,
    };
  }

  async fetchStudentsReport(gsIds: string[]) {
    const subjects = await new SubjectService().fetchSubjects();
    const marks: any[] = [];
    const promises: Promise<any>[] = [];

    gsIds.forEach((gsId) => {
      promises.push(
        this.fetchStudentData(gsId, subjects).then((report) =>
          marks.push(report)
        )
      );
    });

    await Promise.all(promises);

    return marks;
  }

  async generateReportPdf(gradeId: string) {
    const gsIds = await new GradeStudentRepo().fetchGradeStudents(gradeId);

    const data = await this.fetchStudentsReport(gsIds);
    // console.log(JSON.stringify(data, null, 2));
    data.sort((a, b) => a.studentData.name.localeCompare(b.studentData.name));
    const pdfPath = await generateHtmlReport(gradeId, data, promotionMap);

    return pdfPath;
    // return data;
  }

  async generateStudentReportPdf(gsId: string) {
    const gradeStudent = await this.gsService.findOne(gsId);
    const data = await this.fetchStudentsReport([gsId]);
    const pdfPath = await generateHtmlReport(
      gradeStudent.grade_id,
      data,
      promotionMap
    );

    return pdfPath;
  }
}
