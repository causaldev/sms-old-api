import FixedPayment from '../../fixed/fixedPayment';
import RecurrentPaymentChild from '../../recurrent/recurrentPaymentChild/recurrentPaymentChild';
import { Penalty } from '../penalty';

const PenaltyFactory = {
  fromFixed: (fixedPayment: FixedPayment): Penalty => ({
    has_penalty: fixedPayment.has_penalty,
    no_penalty_days: fixedPayment.no_penalty_days,
    penalty_type: fixedPayment.penalty_type,
    penalty_amount: fixedPayment.penalty_amount,
    penalty_frequency: fixedPayment.penalty_frequency,
    penalty_reapply_days: fixedPayment.penalty_reapply_days,
    max_penalty: fixedPayment.max_penalty,
    max_penalty_apply_days: fixedPayment.max_penalty_apply_days,
  }),

  fromRecurrent: (recurrentChild: RecurrentPaymentChild): Penalty => ({
    has_penalty: recurrentChild.has_penalty,
    no_penalty_days: recurrentChild.no_penalty_days,
    penalty_type: recurrentChild.penalty_type,
    penalty_amount: recurrentChild.penalty_amount,
    penalty_frequency: recurrentChild.penalty_frequency,
    penalty_reapply_days: recurrentChild.penalty_reapply_days,
    max_penalty: recurrentChild.max_penalty,
    max_penalty_apply_days: recurrentChild.max_penalty_apply_days,
  }),
};

export default PenaltyFactory;
