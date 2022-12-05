import { DateTime } from 'luxon';
import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import { PenaltyFrequency, PenaltyType } from '../../lib/payment-types';
import RecurrentPaymentPending from '../recurrentPaymentPending/recurrentPaymentPending';

export default class RecurrentPaymentChild extends Model {
  @column.date()
  public start_date: DateTime;

  @column.date()
  public end_date: DateTime;

  @column()
  public amount: number;

  @column()
  public order: number;

  @column()
  public description: string;

  @column()
  public has_penalty: boolean;

  @column()
  public no_penalty_days: number;

  @column()
  public penalty_type: PenaltyType;

  @column()
  public penalty_amount: number;

  @column()
  public penalty_frequency: PenaltyFrequency;

  @column()
  public penalty_reapply_days: number;

  @column()
  public max_penalty: number | null;

  @column()
  public max_penalty_apply_days: number | null;

  @column()
  public recurrent_payment_id: string;

  @hasMany(() => RecurrentPaymentPending, {
    foreignKey: 'recurrent_payment_child_id',
  })
  public pendingPayments: HasMany<typeof RecurrentPaymentPending>;
}
