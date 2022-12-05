import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import Service from 'app/modules/_shared/service';
import FeePayment from './feePayment';
import FeePaymentRepo from './feePaymentRepo';

export default class FeePaymentService extends Service<FeePayment> {
  constructor() {
    super(new FeePaymentRepo());
  }

  async create(createData: Partial<FeePayment>, auth: AuthContract) {
    const year = await AcademicYearService.getActive();

    return super.create({
      ...createData,
      user_id: auth.user!.id,
      academic_year_id: year.id,
    });
  }
}
