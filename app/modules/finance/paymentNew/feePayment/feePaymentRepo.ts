import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import { Repo } from 'app/modules/_shared/repo';
import { Months } from '../../payment/payment';
import FeePayment from './feePayment';

export default class FeePaymentRepo extends Repo<FeePayment> {
  constructor() {
    super(FeePayment);
  }

  async nonPaidMonths(studentId: string) {
    const year = await AcademicYearService.getActive();
    const paidMonths = (
      await FeePayment.query()
        .where('student_id', studentId)
        .where('academic_year_id', year.id)
    ).map((item) => item.month);

    return Object.values(Months).filter((month) => !paidMonths.includes(month));
  }

  async monthPaid(studentId: string, month: Months) {
    const year = await AcademicYearService.getActive();
    const fee = await FeePayment.query()
      .where('student_id', studentId)
      .where('academic_year_id', year.id)
      .where('month', month)
      .first();

    return fee !== null;
  }
}
