import { RequestContract } from '@ioc:Adonis/Core/Request';
import { transactLocalized } from 'app/services/utils';
import RecurrentPayment from '../recurrentPayment';
import RecurrentPaymentChild from '../recurrentPaymentChild/recurrentPaymentChild';
import {
  RecurrentPaymentEditVal,
  RecurrentPaymentVal,
} from './recurrentPaymentVal';

const RecurrentPaymentService = {
  findOne: (id: string) => {
    return RecurrentPayment.query()
      .preload('recurrentChildren')
      .where('id', id)
      .firstOrFail();
  },

  findActive: () => {
    return RecurrentPayment.query()
      .where('archived', false)
      .preload('recurrentChildren');
  },

  findArchived: () => {
    return RecurrentPayment.query().where('archived', true);
  },

  edit: async (request: RequestContract) => {
    const { id } = request.params();
    const data = await request.validate(RecurrentPaymentEditVal);

    const payment = await RecurrentPayment.findByOrFail('id', id);
    payment.merge(data);
    await payment.save();

    return payment;
  },

  createRecurrent: async (request: RequestContract) => {
    const data = await request.validate(RecurrentPaymentVal);
    let recurrentId = '';

    await transactLocalized(async (trx) => {
      const recurrent = await RecurrentPayment.create(
        {
          effective_date: data.effective_date,
          end_date: data.end_date,
          description: data.description,
          total_pay_count: data.payments.length,
        },
        {
          client: trx,
        }
      );
      recurrentId = recurrent.id;

      for (const recurrentChild of data.payments) {
        await RecurrentPaymentChild.create(
          {
            ...recurrentChild,
            recurrent_payment_id: recurrent.id,
          },
          {
            client: trx,
          }
        );
      }
    });

    return recurrentId;
  },

  delete: async (id: string) => {
    const payment = await RecurrentPayment.findByOrFail('id', id);
    await payment.delete();
  },
};

export default RecurrentPaymentService;
