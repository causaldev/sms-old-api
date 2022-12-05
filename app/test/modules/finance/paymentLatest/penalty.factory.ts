import faker from 'faker';
import { Penalty } from 'app/modules/finance/paymentLatest/penalty/penalty';
import { getRandomItem } from 'app/test/testUtils';
import {
  PenaltyFrequency,
  PenaltyType,
} from 'app/modules/finance/paymentLatest/lib/payment-types';

export const penaltyFactory = (data: Partial<Penalty> = {}): Penalty => ({
  has_penalty: faker.datatype.boolean(),
  no_penalty_days: faker.datatype.number(),
  penalty_type: getRandomItem(Object.values(PenaltyType)),
  penalty_amount: faker.datatype.number(),
  penalty_frequency: getRandomItem(Object.values(PenaltyFrequency)),
  penalty_reapply_days: faker.datatype.number(),
  max_penalty: faker.datatype.number(),
  max_penalty_apply_days: faker.datatype.number(),
  ...data,
});
