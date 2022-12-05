import { RequestContract } from '@ioc:Adonis/Core/Request';
import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import GsActivenessService from 'app/modules/academic/gradeStudent/_lib/activeness/_lib/gs_activeness_service';
import { transactLocalized } from 'app/services/utils';
import FixedPaymentPending from '../../fixedPaymentPending/fixedPaymentPending';
import FixedPaymentPendingService from '../../fixedPaymentPending/lib/fixedPaymentPendingService';
import FixedPaymentService from '../../lib/fixedPaymentService';
import FixedStudentPayment from '../fixedStudentPayment';
import { FixedStudentPaymentVal } from './fixedStudentPaymentVal';

const FixedStudentPaymentService = {
  createPayment: async (request: RequestContract, userId: string) => {
    const year = await AcademicYearService.getActive();
    const {
      fixed_payment_pending_id,
      fs,
      attachment,
      cash,
      slip_date,
      remark,
      penalty,
    } = await request.validate(FixedStudentPaymentVal);

    const paymentPending = await FixedPaymentPendingService.findOne(
      fixed_payment_pending_id
    );
    const fixedPayment = await FixedPaymentService.findOne(
      paymentPending.fixed_payment_id
    );

    await transactLocalized(async (trx) => {
      await FixedStudentPayment.create(
        {
          fs,
          attachment,
          cash,
          slip_date,
          remark,
          fixed_payment_id: paymentPending.fixed_payment_id,
          discount: paymentPending.discount_amount,
          amount: fixedPayment.amount,
          penalty: penalty,
          total: fixedPayment.amount,
          student_id: paymentPending.student_id,
          grade_id: paymentPending.grade_id,
          user_id: userId,
        },
        {
          client: trx,
        }
      );

      await GsActivenessService.setActive(
        paymentPending.student_id,
        paymentPending.grade_id,
        year.id,
        paymentPending.fixed_payment_id
      );

      await FixedPaymentPending.query({ client: trx })
        .where('id', fixed_payment_pending_id)
        .delete();
    });
  },

  studentPaid: async (
    studentId: string,
    {
      grade_id,
      fixed_payment_id,
    }: {
      grade_id: string;
      fixed_payment_id: string;
    }
  ) => {
    const fixed = await FixedStudentPayment.query()
      .where('student_id', studentId || '')
      .where('grade_id', grade_id || '')
      .where('fixed_payment_id', fixed_payment_id || '')
      .first();

    return fixed !== null;
  },
};

export default FixedStudentPaymentService;
