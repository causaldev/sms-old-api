import AcademicYear from 'app/modules/academic/academicYear/academicYear';
import { Repo } from 'app/modules/_shared/repo';
import RegistrationPayment from './registrationPayment';

export default class RegistrationPaymentRepo extends Repo<RegistrationPayment> {
  constructor() {
    super(RegistrationPayment);
  }

  async alreadyRegisteredForCurrentYear(studentId: string) {
    const year = await AcademicYear.getActiveYear();
    const registration = await RegistrationPayment.query()
      .where('student_id', studentId)
      .where('academic_year_id', year.id)
      .first();

    return registration !== null;
  }
}
