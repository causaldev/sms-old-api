import { PenaltyFrequency, PenaltyType } from '../lib/payment-types';

export type Penalty = {
  has_penalty: boolean;
  no_penalty_days: number;
  penalty_type: PenaltyType;
  penalty_amount: number;
  penalty_frequency: PenaltyFrequency;
  penalty_reapply_days: number;
  max_penalty: number | null;
  max_penalty_apply_days: number | null;
};
