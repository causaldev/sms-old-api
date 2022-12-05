import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Service from 'app/modules/_shared/service';
import AcademicYearService from '../../academicYear/academicYearService';
import GradeStudent from '../../gradeStudent/gradeStudent';
import Conduct from './conduct';
import ConductRepo from './conductRepo';

export default class ConductService extends Service<Conduct> {
  constructor() {
    super(new ConductRepo());
  }

  create(createData: Partial<Conduct>, _auth?: AuthContract): Promise<Conduct> {
    return this.repo.updateOrCreateModel(
      {
        grade_student_id: createData.grade_student_id,
        quarter_id: createData.quarter_id,
      },
      createData
    );
  }

  async fetchStudentConduct(studentId: string) {
    const year = await AcademicYearService.getActive();
    const conduct = await GradeStudent.query()
      .where('student_id', studentId)
      .where('academic_year_id', year.id)
      .preload('conducts', (conductBuilder) => {
        conductBuilder.preload('quarter');
      })
      .first();

    return conduct;
  }
}
