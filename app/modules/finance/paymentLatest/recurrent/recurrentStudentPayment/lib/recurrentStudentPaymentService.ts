import { RequestContract } from '@ioc:Adonis/Core/Request';
import { transactLocalized } from 'app/services/utils';
import RecurrentPaymentChild from '../../recurrentPaymentChild/recurrentPaymentChild';
import RecurrentPaymentPending from '../../recurrentPaymentPending/recurrentPaymentPending';
import RecurrentStudentPayment from '../recurrentStudentPayment';
import { RecurrentStudentPaymentVal } from './recurrentStudentPaymentVal';

const RecurrentStudentPaymentService = {
  createPayment: async (request: RequestContract, userId: string) => {
    const {
      fs,
      attachment,
      cash,
      slip_date,
      remark,
      penalty,
      recurrent_payment_pending_id,
    } = await request.validate(RecurrentStudentPaymentVal);

    const paymentPending = await RecurrentPaymentPending.findByOrFail(
      'id',
      recurrent_payment_pending_id
    );
    const paymentChild = await RecurrentPaymentChild.findByOrFail(
      'id',
      paymentPending.recurrent_payment_child_id
    );

    await transactLocalized(async (trx) => {
      await RecurrentStudentPayment.create(
        {
          fs,
          attachment,
          cash,
          slip_date,
          remark,
          penalty,
          recurrent_payment_id: paymentPending.recurrent_payment_id,
          recurrent_payment_child_id: paymentPending.recurrent_payment_child_id,
          amount: paymentChild.amount,
          discount: paymentPending.discount_amount,
          total: paymentChild.amount,
          user_id: userId,
          student_id: paymentPending.student_id,
          grade_id: paymentPending.grade_id,
        },
        {
          client: trx,
        }
      );

      await RecurrentPaymentPending.query({ client: trx })
        .where('id', paymentPending.id)
        .delete();
    });
  },

  studentPaid: async (
    recurrent_payment_child_id: string,
    {
      grade_id,
      student_id,
    }: {
      grade_id: string;
      student_id: string;
    }
  ) => {
    const payment = await RecurrentStudentPayment.query()
      .where('student_id', student_id || '')
      .where('grade_id', grade_id || '')
      .where('recurrent_payment_child_id', recurrent_payment_child_id || '')
      .first();

    return payment !== null;
  },
};

export default RecurrentStudentPaymentService;
