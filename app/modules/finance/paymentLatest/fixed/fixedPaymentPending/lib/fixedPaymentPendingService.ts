import { RequestContract } from '@ioc:Adonis/Core/Request';
import { batchedPromises, transactLocalized } from 'app/services/utils';
import FixedPaymentPending from '../fixedPaymentPending';
import {
  FixedPaymentPendingVal,
  FixedPendingAssignStudentVal,
} from './fixedPaymentPendingVal';

const FixedPaymentPendingService = {
  findOne: (id: string) => {
    return FixedPaymentPending.findByOrFail('id', id);
  },

  createPending: async (request: RequestContract) => {
    const { students, fixed_payment_id } = await request.validate(
      FixedPaymentPendingVal
    );

    await transactLocalized(async (trx) => {
      await batchedPromises(students, (student) =>
        FixedPaymentPending.updateOrCreate(
          {
            student_id: student.student_id,
            grade_id: student.grade_id,
            fixed_payment_id: fixed_payment_id,
          },
          {
            student_id: student.student_id,
            grade_id: student.grade_id,
            fixed_payment_id: fixed_payment_id,
            discount_amount: 0,
          },
          {
            client: trx,
          }
        )
      );
    });
  },

  assignPending: async (request: RequestContract) => {
    const { student_id, grade_id, fixed_payment_id } = await request.validate(
      FixedPendingAssignStudentVal
    );

    return FixedPaymentPending.create({
      student_id: student_id,
      grade_id: grade_id,
      fixed_payment_id: fixed_payment_id,
      discount_amount: 0,
    });
  },

  delete: async (id: string) => {
    const pending = await FixedPaymentPendingService.findOne(id);
    await pending.delete();
  },

  getStudentPending: async (studentId: string) => {
    const pending = await FixedPaymentPending.query()
      .where('student_id', studentId)
      .whereHas('fixedPayment', (fixedBuilder) => {
        fixedBuilder.where('archived', false);
      })
      .preload('fixedPayment');

    return pending;
  },

  studentInPending: async (
    studentId: string,
    {
      grade_id,
      fixed_payment_id,
    }: {
      grade_id: string;
      fixed_payment_id: string;
    }
  ) => {
    const pending = await FixedPaymentPending.query()
      .where('student_id', studentId || '')
      .where('grade_id', grade_id || '')
      .where('fixed_payment_id', fixed_payment_id || '')
      .first();

    return pending !== null;
  },
};

export default FixedPaymentPendingService;
