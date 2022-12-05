import {
  PenaltyFrequency,
  PenaltyType,
} from 'app/modules/finance/paymentLatest/lib/payment-types';
import { Penalty } from 'app/modules/finance/paymentLatest/penalty/penalty';
import PenaltyService from 'app/modules/finance/paymentLatest/penalty/_lib/penaltyService';
import { expect } from 'chai';
import test from 'japa';
import moment from 'moment';
import { penaltyFactory } from './penalty.factory';

const incrementDays = [1, 5, 10, 100, 500];
const effective_date = '2020-01-01';

test.group('Penalty Service', () => {
  const noPenaltyDays = 10;
  const oneTimePenalty = penaltyFactory({
    has_penalty: true,
    no_penalty_days: noPenaltyDays,
    penalty_type: PenaltyType.Fixed,
    penalty_frequency: PenaltyFrequency.OneTime,
    penalty_amount: 300,
    max_penalty: 1000,
  });
  const recurrentPenalty = penaltyFactory({
    has_penalty: true,
    no_penalty_days: noPenaltyDays,
    penalty_type: PenaltyType.Fixed,
    penalty_frequency: PenaltyFrequency.Recurrent,
    penalty_amount: 300,
    max_penalty: 1000,
    penalty_reapply_days: 5,
  });

  test(' no penalty returns 0 validate 0', () => {
    const noPenalty = penaltyFactory({ has_penalty: false });
    expect(
      PenaltyService.getPenalty(noPenalty, 0, moment(), moment())
    ).to.equal(0);
  });

  test.group('recurrent percentage', () => {
    const recurrentPercentage: Penalty = {
      ...recurrentPenalty,
      penalty_type: PenaltyType.Percentage,
      penalty_amount: 5,
    };

    test('wont charge if not past date for percentage', () => {
      // Won't apply for no days
      for (let i = 0; i <= noPenaltyDays; i++) {
        expect(
          PenaltyService.getPenalty(
            recurrentPenalty,
            100,
            moment(effective_date),
            moment(effective_date).add(i, 'day')
          )
        ).to.equal(0, `no apply day ${i}`);
      }
    });

    test('charges percentage for recurrent dates', () => {
      expect(
        PenaltyService.getPenalty(
          recurrentPercentage,
          1000,
          moment(effective_date),
          moment(effective_date).add(
            recurrentPercentage.no_penalty_days + 1,
            'day'
          )
        )
      ).to.equal(50);
      expect(
        PenaltyService.getPenalty(
          recurrentPercentage,
          1000,
          moment(effective_date),
          moment(effective_date).add(
            recurrentPercentage.no_penalty_days + 5,
            'day'
          )
        )
      ).to.equal(50);
      expect(
        PenaltyService.getPenalty(
          recurrentPercentage,
          1000,
          moment(effective_date),
          moment(effective_date).add(
            recurrentPercentage.no_penalty_days + 6,
            'day'
          )
        )
      ).to.equal(100);
      expect(
        PenaltyService.getPenalty(
          recurrentPercentage,
          1000,
          moment(effective_date),
          moment(effective_date).add(
            recurrentPercentage.no_penalty_days + 11,
            'day'
          )
        )
      ).to.equal(150);

      // Won't get past no apply date
      expect(
        PenaltyService.getPenalty(
          { ...recurrentPercentage, max_penalty_apply_days: 8 },
          1000,
          moment(effective_date),
          moment(effective_date).add(
            recurrentPercentage.no_penalty_days + 11,
            'day'
          )
        )
      ).to.equal(100);

      // Won't get past max penalty
      expect(
        PenaltyService.getPenalty(
          {
            ...recurrentPercentage,
            max_penalty_apply_days: 8,
            max_penalty: 25,
          },
          1000,
          moment(effective_date),
          moment(effective_date).add(
            recurrentPercentage.no_penalty_days + 11,
            'day'
          )
        )
      ).to.equal(25);
    });
  });

  test.group('recurrent fixed', () => {
    test('wont charge if not past date for fixed', () => {
      // Won't apply for no days
      for (let i = 0; i <= noPenaltyDays; i++) {
        expect(
          PenaltyService.getPenalty(
            recurrentPenalty,
            100,
            moment(effective_date),
            moment(effective_date).add(i, 'day')
          )
        ).to.equal(0, `no apply day ${i}`);
      }
    });

    test('charges fixed for recurrent dates', () => {
      expect(
        PenaltyService.getPenalty(
          recurrentPenalty,
          100,
          moment(effective_date),
          moment(effective_date).add(
            recurrentPenalty.no_penalty_days + 1,
            'day'
          )
        )
      ).to.equal(300);
      expect(
        PenaltyService.getPenalty(
          recurrentPenalty,
          100,
          moment(effective_date),
          moment(effective_date).add(
            recurrentPenalty.no_penalty_days + 2,
            'day'
          )
        )
      ).to.equal(300);
      expect(
        PenaltyService.getPenalty(
          recurrentPenalty,
          100,
          moment(effective_date),
          moment(effective_date).add(
            recurrentPenalty.no_penalty_days + 5,
            'day'
          )
        )
      ).to.equal(300);
      expect(
        PenaltyService.getPenalty(
          recurrentPenalty,
          100,
          moment(effective_date),
          moment(effective_date).add(
            recurrentPenalty.no_penalty_days + 6,
            'day'
          )
        )
      ).to.equal(600);

      // Can't pass max apply days
      expect(
        PenaltyService.getPenalty(
          { ...recurrentPenalty, max_penalty_apply_days: 10 },
          100,
          moment(effective_date),
          moment(effective_date).add(
            recurrentPenalty.no_penalty_days + 11,
            'day'
          )
        )
      ).to.equal(600);

      // Can't pass max penalty
      expect(
        PenaltyService.getPenalty(
          { ...recurrentPenalty, max_penalty: 450 },
          100,
          moment(effective_date),
          moment(effective_date).add(
            recurrentPenalty.no_penalty_days + 6,
            'day'
          )
        )
      ).to.equal(450);
    });
  });

  test.group('one time fixed', () => {
    test('wont charge if not past date for fixed', () => {
      // Won't apply for no days
      for (let i = 0; i <= noPenaltyDays; i++) {
        expect(
          PenaltyService.getPenalty(
            oneTimePenalty,
            100,
            moment(effective_date),
            moment(effective_date).add(i, 'day')
          )
        ).to.equal(0, `no apply day ${i}`);
      }
    });

    test('charges same amount after penalty start date', () => {
      incrementDays.forEach((day) => {
        expect(
          PenaltyService.getPenalty(
            oneTimePenalty,
            100,
            moment(effective_date),
            moment(effective_date).add(
              oneTimePenalty.no_penalty_days + day,
              'day'
            )
          )
        ).to.equal(oneTimePenalty.penalty_amount, `past apply day ${day}`);
      });

      incrementDays.forEach((day) => {
        expect(
          PenaltyService.getPenalty(
            { ...oneTimePenalty, max_penalty: 80 },
            100,
            moment(effective_date),
            moment(effective_date).add(
              oneTimePenalty.no_penalty_days + day,
              'day'
            )
          )
        ).to.equal(80, `past apply day ${day}`);
      });
    });
  });

  test.group('one time percentage', () => {
    const oneTimePercentage: Penalty = {
      ...oneTimePenalty,
      penalty_type: PenaltyType.Percentage,
      penalty_amount: 15,
    };

    test('wont charge if not past date for fixed', () => {
      // Won't apply for no days
      for (let i = 0; i <= noPenaltyDays; i++) {
        expect(
          PenaltyService.getPenalty(
            oneTimePercentage,
            100,
            moment(effective_date),
            moment(effective_date).add(i, 'day')
          )
        ).to.equal(0, `no apply day ${i}`);
      }
    });

    test('changes same percent amount of base pay for past apply date', () => {
      incrementDays.forEach((day) => {
        expect(
          PenaltyService.getPenalty(
            oneTimePercentage,
            1000,
            moment(effective_date),
            moment(effective_date).add(
              oneTimePercentage.no_penalty_days + day,
              'day'
            )
          )
        ).to.equal(150, `past apply day ${day}`);
      });

      // Can't pass max penalty
      incrementDays.forEach((day) => {
        expect(
          PenaltyService.getPenalty(
            { ...oneTimePercentage, max_penalty: 70 },
            1000,
            moment(effective_date),
            moment(effective_date).add(
              oneTimePercentage.no_penalty_days + day,
              'day'
            )
          )
        ).to.equal(70, `past apply day ${day}`);
      });
    });
  });
});
