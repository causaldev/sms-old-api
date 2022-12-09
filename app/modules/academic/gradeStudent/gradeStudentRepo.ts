import moment from 'moment';
import { Repo } from 'app/modules/_shared/repo';
import { quarterMap } from 'app/modules/_shared/types';
import AcademicYear from '../academicYear/academicYear';
import Conduct from '../student/conduct/conduct';
import GradeStudent from './gradeStudent';

export default class GradeStudentRepo extends Repo<GradeStudent> {
  constructor() {
    super(GradeStudent);
  }

  async promoteGrade(studentIds: string[], gradeId: string, yearId: string) {
    const promises: Promise<any>[] = [];

    studentIds.forEach((studentId) => {
      const data = {
        student_id: studentId,
        grade_id: gradeId,
        academic_year_id: yearId,
      };
      promises.push(
        this.updateOrCreateModel(
          {
            student_id: studentId,
            academic_year_id: yearId,
          },
          data
        )
      );
    });

    await Promise.all(promises);
  }

  async fetchGradeStudents(gradeId: string) {
    const year = await AcademicYear.getActiveYear();
    const gradeStudents = await GradeStudent.query()
      .whereHas('student', (studentQuery) => {
        studentQuery.where('status', 'Active');
      })
      .where('active', true)
      .where('academic_year_id', year.id)
      .where('grade_id', gradeId);

    return this.pluck(gradeStudents);
  }

  async fetchStudentReport(gradeStudentId: string) {
    const gs = await GradeStudent.query()
      .preload('student')
      .preload('academicYear')
      .preload('grade')
      .where('id', gradeStudentId)
      .firstOrFail();

    const {
      student: {
        first_name,
        father_name,
        grand_father_name,
        gender,
        date_of_birth,
      },
      grade,
      academicYear: { year },
    } = gs.serialize();

    return {
      name: `${first_name} ${father_name || ''} ${grand_father_name || ''}`,
      sex: gender,
      grade: grade.name,
      promotedTo: '',
      year,
      age: date_of_birth ? moment().diff(moment(date_of_birth), 'years') : '',
    };
  }

  async fetchConducts(gsId: string) {
    const conducts = await Conduct.query()
      .where('grade_student_id', gsId)
      .preload('quarter');

    const conductMap: Record<string, string> = {};
    conducts.forEach((conduct) => {
      conductMap[quarterMap[conduct.quarter.quarter]] = conduct.conduct;
    });

    return conductMap;
  }
}
