import moment from 'moment';
import { PenaltyFrequency, PenaltyType } from '../../lib/payment-types';
import { Penalty } from '../penalty';

const PenaltyService = {
  getPenalty: (
    penalty: Penalty,
    basePayment: number,
    effectiveDate: moment.Moment,
    paymentDate: moment.Moment
  ): number => {
    if (!penalty.has_penalty) return 0;

    const diffDays = paymentDate.diff(effectiveDate, 'day');

    if (diffDays <= penalty.no_penalty_days || diffDays <= 0) return 0;

    let daysPastPenalty = diffDays - penalty.no_penalty_days;

    if (penalty.max_penalty_apply_days !== null) {
      daysPastPenalty = Math.min(
        daysPastPenalty,
        penalty.max_penalty_apply_days
      );
    }

    // console.log(daysPastPenalty);

    const totalPenalty =
      penalty.penalty_frequency === PenaltyFrequency.OneTime
        ? PenaltyService.getOneTime(penalty, basePayment)
        : PenaltyService.getRecurrent(penalty, daysPastPenalty, basePayment);

    return penalty.max_penalty !== null
      ? Math.min(totalPenalty, penalty.max_penalty)
      : totalPenalty;
  },

  getOneTime: (penalty: Penalty, basePayment: number): number => {
    return penalty.penalty_type === PenaltyType.Fixed
      ? penalty.penalty_amount
      : (basePayment * penalty.penalty_amount) / 100;
  },

  getRecurrent: (
    penalty: Penalty,
    daysPastNoPenalty: number,
    basePayment: number
  ): number => {
    const paymentCount = Math.ceil(
      daysPastNoPenalty / penalty.penalty_reapply_days
    );
    // console.log(
    //   paymentCount,
    //   basePayment,
    //   PenaltyService.getOneTime(penalty, basePayment)
    // );

    return paymentCount * PenaltyService.getOneTime(penalty, basePayment);
  },
};

export default PenaltyService;
