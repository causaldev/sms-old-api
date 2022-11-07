import { RequestContract } from '@ioc:Adonis/Core/Request';
import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import { batchedPromises, transactLocalized } from 'app/services/utils';
import RecurrentPaymentChild from '../../recurrentPaymentChild/recurrentPaymentChild';
import RecurrentPaymentPending from '../recurrentPaymentPending';
import {
  RecurrentPaymentPendingVal,
  RecurrentPaymentStudentAssignVal,
} from './recurrentPaymentPendingVal';

const RecurrentPaymentPendingService = {
  findOne: (id: string) => {
    return RecurrentPaymentPending.findByOrFail('id', id);
  },

  findByPaymentChild: async (paymentChildId: string) => {
    const year = await AcademicYearService.getActive();

    return RecurrentPaymentPending.query()
      .where('recurrent_payment_child_id', paymentChildId)
      .preload('grade')
      .preload('recurrentPaymentChild', (builder) => {
        builder.select('amount');
      })
      .preload('student', (studentBuilder) => {
        studentBuilder.preload('gradeStudents', (gsBuilder) => {
          gsBuilder.where('academic_year_id', year.id);
        });
      });
  },

  createPending: async (request: RequestContract) => {
    const { payments } = await request.validate(RecurrentPaymentPendingVal);

    await transactLocalized(async (trx) => {
      for (const payment of payments) {
        const recurrentChild = await RecurrentPaymentChild.findByOrFail(
          'id',
          payment.recurrent_payment_child_id
        );

        await batchedPromises(
          payment.students,
          (item) =>
            RecurrentPaymentPending.create(
              {
                grade_id: item.grade_id,
                student_id: item.student_id,
                discount_amount: 0,
                recurrent_payment_id: recurrentChild.recurrent_payment_id,
                recurrent_payment_child_id: recurrentChild.id,
              },
              {
                client: trx,
              }
            ),
          10
        );
      }
    });
  },

  delete: async (id: string) => {
    const pending = await RecurrentPaymentPendingService.findOne(id);
    await pending.delete();
  },

  addStudent: async (request: RequestContract) => {
    const { grade_id, student_id, payments } = await request.validate(
      RecurrentPaymentStudentAssignVal
    );

    await transactLocalized(async (trx) => {
      await batchedPromises(
        payments,
        (recurrentPaymentChildId) =>
          new Promise(async (resolve, reject) => {
            try {
              const recurrentChild = await RecurrentPaymentChild.findByOrFail(
                'id',
                recurrentPaymentChildId
              );

              await RecurrentPaymentPending.create(
                {
                  student_id,
                  grade_id,
                  recurrent_payment_child_id: recurrentPaymentChildId,
                  recurrent_payment_id: recurrentChild.recurrent_payment_id,
                  discount_amount: 0,
                },
                {
                  client: trx,
                }
              );
              resolve(true);
            } catch (err) {
              reject(err);
            }
          })
      );
    });
  },

  studentInPending: async (
    recurrent_payment_child_id: string,
    {
      grade_id,
      student_id,
    }: {
      grade_id: string;
      student_id: string;
    }
  ) => {
    const pending = await RecurrentPaymentPending.query()
      .where('student_id', student_id || '')
      .where('grade_id', grade_id || '')
      .where('recurrent_payment_child_id', recurrent_payment_child_id || '')
      .first();

    return pending !== null;
  },
};

export default RecurrentPaymentPendingService;
