import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import Student from 'app/modules/academic/student/student';
import Service from 'app/modules/_shared/service';
import RegistrationPayment from './registrationPayment';
import RegistrationPaymentRepo from './registrationPaymentRepo';

export default class RegistrationPaymentService extends Service<RegistrationPayment> {
  constructor() {
    super(new RegistrationPaymentRepo());
  }

  async create(createData: Partial<RegistrationPayment>, auth: AuthContract) {
    const year = await AcademicYearService.getActive();

    return this.repo.createModel({
      ...createData,
      hidden: false,
      academic_year_id: year.id,
      user_id: auth.user!.id,
    });
  }

  async listRegisteredGrade(gradeId: string) {
    const year = await AcademicYearService.getActive();
    const students = await Student.query()
      // .whereHas('registrationPayments', (regBuilder) => {
      //   regBuilder.where('academic_year_id', year.id);
      // })
      .whereHas('gradeStudents', (gsBuilder) => {
        gsBuilder.where('academic_year_id', year.id).where('grade_id', gradeId);
      })
      .orderBy('first_name', 'asc');

    return this.repo.massSerialize(students);
  }

  async listNonRegisteredByGrade(gradeId: string) {
    const year = await AcademicYearService.getActive();
    const students = await Student.query()
      // .whereDoesntHave('registrationPayments', (regBuilder) => {
      //   regBuilder.where('academic_year_id', year.id);
      // })
      .whereHas('gradeStudents', (gsBuilder) => {
        gsBuilder.where('academic_year_id', year.id).where('grade_id', gradeId);
      })
      .orderBy('first_name', 'asc');

    return this.repo.massSerialize(students);
  }
}
