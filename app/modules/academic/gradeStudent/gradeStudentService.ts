import Service from 'app/modules/_shared/service';
import { quarterMap, StudentStatus } from 'app/modules/_shared/types';
import { transactLocalized } from 'app/services/utils';
import AcademicYear from '../academicYear/academicYear';
import AcademicYearService from '../academicYear/academicYearService';
import Grade from '../grade/grade';
import NurserySkill from '../student/nurserySkill/nurserySkill';
import NurserySkillService from '../student/nurserySkill/nurserySkillService';
import Skill from '../student/skill/skill';
import SkillService from '../student/skill/skillService';
import Student from '../student/student';
import GradeStudent from './gradeStudent';
import GradeStudentRepo from './gradeStudentRepo';

export default class GradeStudentService extends Service<GradeStudent> {
  constructor(
    protected skillService = new SkillService(),
    protected nurserySkillService = new NurserySkillService()
  ) {
    super(new GradeStudentRepo());
  }

  async setActive(gsId: string) {
    return GradeStudent.query().where('id', gsId).update({
      active: true,
    });
  }

  async getByStudentGradeYear(
    studentId: string,
    gradeId: string,
    yearId: string
  ) {
    return GradeStudent.query()
      .where('student_id', studentId)
      .where('grade_id', gradeId)
      .where('academic_year_id', yearId)
      .first();
  }

  async gradeWithStudents(yearId: string) {
    const grades = await Grade.query().orderBy('order');

    const promises: Promise<any>[] = [];

    grades.forEach((grade, i) => {
      promises.push(
        new Promise(async (r) => {
          const students = (
            await GradeStudent.query()
              .preload('student')
              .where('grade_id', grade.id)
              .where('academic_year_id', yearId)
          ).map((i) => i.student);

          (grades[i] as any).students = students;

          r(true);
        })
      );
    });

    await Promise.all(promises);

    return grades;
  }

  async allYearGradeStudents(yearId: string) {
    const gradeStudents = await GradeStudent.query()
      .preload('student')
      .preload('grade')
      .where('academic_year_id', yearId);

    return gradeStudents.sort((a, b) =>
      a.student.first_name.localeCompare(b.student.first_name)
    );
  }

  async yearGradeStudents(yearId: string, gradeId: string) {
    const gradeStudents = await GradeStudent.query()
      .preload('student')
      .preload('grade')
      .where('grade_id', gradeId)
      .where('academic_year_id', yearId);

    return gradeStudents.sort((a, b) =>
      a.student.first_name.localeCompare(b.student.first_name)
    );
  }

  async yearStudents(gradeId: string, yearId: string) {
    const students = (
      await GradeStudent.query()
        .preload('student')
        .where('active', true)
        .where('grade_id', gradeId)
        .where('academic_year_id', yearId)
    ).map((i) => i.student);

    return students.sort((a, b) => a.first_name.localeCompare(b.first_name));
  }

  async changeMultiStudentGrade(
    studentIds: string[],
    gradeId: string,
    yearId: string
  ) {
    await transactLocalized(async (trx) => {
      const promises: Promise<any>[] = [];

      studentIds.forEach((studentId) => {
        promises.push(
          GradeStudent.updateOrCreate(
            {
              student_id: studentId,
              academic_year_id: yearId,
            },
            {
              student_id: studentId,
              academic_year_id: yearId,
              grade_id: gradeId,
            },
            {
              client: trx,
            }
          )
        );
      });

      await Promise.all(promises);
    });
  }

  // TODO: Unit test
  async changeStudentGrade(studentId: string, gradeId: string) {
    const year = await AcademicYearService.getActive();

    return this.repo.updateOrCreateModel(
      {
        student_id: studentId,
        academic_year_id: year.id,
      },
      {
        grade_id: gradeId,
        student_id: studentId,
        academic_year_id: year.id,
      }
    );
  }

  async changeGrade(id: string, gradeId: string) {
    return this.repo.updateModel(id, {
      grade_id: gradeId,
    });
  }

  async promoteGrade(studentIds: string[], gradeId: string, yearId: string) {
    return (this.repo as GradeStudentRepo).promoteGrade(
      studentIds,
      gradeId,
      yearId
    );
  }

  async currentStudents(gradeId: string) {
    const year = await AcademicYearService.getActive();

    return Student.query()
      .whereHas('gradeStudents', (gsBuilder) => {
        gsBuilder.where('academic_year_id', year.id).where('grade_id', gradeId);
      })
      .preload('gradeStudents', (gsBuilder) => {
        gsBuilder.where('academic_year_id', year.id).where('grade_id', gradeId);
      })
      .orderBy('first_name');
  }

  async currentRegisteredStudents(gradeId: string) {
    const year = await AcademicYearService.getActive();

    return Student.query()
      .whereHas('gradeStudents', (gsBuilder) => {
        gsBuilder.where('academic_year_id', year.id).where('grade_id', gradeId);
      })
      .preload('gradeStudents', (gsBuilder) => {
        gsBuilder.where('academic_year_id', year.id).where('grade_id', gradeId);
      })
      .orderBy('first_name');
  }

  async currentRegisteredActiveStudents(gradeId: string) {
    const year = await AcademicYearService.getActive();

    return Student.query()
      .whereHas('gradeStudents', (gsBuilder) => {
        gsBuilder
          .where('academic_year_id', year.id)
          .where('grade_id', gradeId)
          .where('active', true)
          .whereHas('student', (studentBuilder) => {
            studentBuilder.where('status', StudentStatus.Active);
          });
      })
      .preload('gradeStudents', (gsBuilder) => {
        gsBuilder.where('academic_year_id', year.id).where('grade_id', gradeId);
      })
      .orderBy('first_name');
  }

  async currentRegisteredInActiveStudents(gradeId: string) {
    const year = await AcademicYearService.getActive();

    return Student.query()
      .whereHas('gradeStudents', (gsBuilder) => {
        gsBuilder
          .where('academic_year_id', year.id)
          .where('grade_id', gradeId)
          .whereHas('student', (studentBuilder) => {
            studentBuilder.where('status', StudentStatus.Inactive);
          });
      })
      .preload('gradeStudents', (gsBuilder) => {
        gsBuilder.where('academic_year_id', year.id).where('grade_id', gradeId);
      })
      .orderBy('first_name');
  }

  async currentRegisteredActiveGradeStudents(gradeId: string, yearId?: string) {
    if (!yearId) {
      yearId = (await AcademicYear.getActiveYear()).id;
    }

    const gradeStudents = await GradeStudent.query()
      .whereHas('student', (studentBuilder) => {
        studentBuilder.where('status', StudentStatus.Active);
      })
      .where('academic_year_id', yearId!)
      .where('grade_id', gradeId);

    return gradeStudents;
  }

  async fetchSkill(gsId: string) {
    const gs = await GradeStudent.query()
      .preload('grade')
      .where('id', gsId)
      .firstOrFail();

    if (gs.grade.skill_template === 'main') {
      const skills =
        (await this.skillService.fetchStudent(gs.student_id))?.skills || [];
      return this.formatSkill(skills);
    } else {
      const nurserySkills =
        (await this.nurserySkillService.fetchStudent(gs.student_id))
          ?.nurserySkills || [];

      return this.formatNurserySkill(nurserySkills);
    }
  }

  formatSkill(skills: Skill[]) {
    const skillMap: Record<string, any> = {
      punctuality: {},
      anthem_participation: {},
      attendance: {},
      completing_work: {},
      follow_rules: {},
      english_use: {},
      listening: {},
      class_participation: {},
      handwriting: {},
      communication_book_use: {},
      material_handling: {},
      cooperation: {},
      school_uniform: {},
    };

    skills.forEach((skill) => {
      Object.keys(skillMap).forEach((key) => {
        skillMap[key][quarterMap[skill.quarter.quarter]] = skill[key] || '';
      });
    });

    return skillMap;
  }

  formatNurserySkill(skills: NurserySkill[]) {
    const skillMap: Record<string, any> = {
      acknowledges: {},
      greets: {},
      works_with_others: {},
      responds: {},
      accepts_responsibility: {},
      obeys_quickly: {},
      completes_work: {},
      listens_and_follows: {},
      work_independently: {},
      vocabulary_improvement: {},
    };

    skills.forEach((skill) => {
      Object.keys(skillMap).forEach((key) => {
        skillMap[key][quarterMap[skill.quarter.quarter]] = skill[key] || '';
      });
    });

    return skillMap;
  }
}
