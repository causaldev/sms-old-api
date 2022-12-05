import moment from 'moment';
import { RequestContract } from '@ioc:Adonis/Core/Request';
import PenaltyFactory from '../../../penalty/_lib/penaltyFactory';
import RecurrentPaymentChild from '../recurrentPaymentChild';
import { RecurrentPaymentChildEdit } from './recurrentPaymentChildVal';
import PenaltyService from '../../../penalty/_lib/penaltyService';

const RecurrentPaymentChildService = {
  findOne: async (id: string) => {
    return RecurrentPaymentChild.findByOrFail('id', id);
  },

  edit: async (request: RequestContract) => {
    const { id } = request.params();
    const data = await request.validate(RecurrentPaymentChildEdit);

    if (request.body().max_penalty === null) {
      data.max_penalty = null as any;
    }
    if (request.body().max_penalty_apply_days === null) {
      data.max_penalty_apply_days = null as any;
    }

    const payment = await RecurrentPaymentChildService.findOne(id);
    payment.merge(data);
    await payment.save();

    return payment;
  },

  delete: async (id: string) => {
    const payment = await RecurrentPaymentChildService.findOne(id);
    await payment.delete();
  },

  getPenalty: async (id: string, slipDate: string | undefined) => {
    const payment = await RecurrentPaymentChildService.findOne(id);
    // console.log(payment.serialize());

    const penaltyRules = PenaltyFactory.fromRecurrent(payment);
    const payDate = slipDate ? moment(slipDate, 'YYYY-MM-DD') : moment();

    return PenaltyService.getPenalty(
      penaltyRules,
      payment.amount,
      moment(payment.start_date.toFormat('yyyy-MM-dd'), 'YYYY-MM-DD'),
      payDate
    );
  },
};

export default RecurrentPaymentChildService;
