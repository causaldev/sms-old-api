import { DateTime } from 'luxon';
import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import FixedStudentPayment from './fixedStudentPayment/fixedStudentPayment';
import FixedPaymentPending from './fixedPaymentPending/fixedPaymentPending';
import { PenaltyFrequency, PenaltyType } from '../lib/payment-types';
export default class FixedPayment extends Model {
  @column.date()
  public effective_date: DateTime;

  @column.date()
  public end_date: DateTime;

  @column()
  public amount: number;

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
  public archived: boolean;

  @hasMany(() => FixedStudentPayment, {
    foreignKey: 'fixed_payment_id',
  })
  public studentPayments: HasMany<typeof FixedStudentPayment>;

  @hasMany(() => FixedPaymentPending, {
    foreignKey: 'fixed_payment_id',
  })
  public fixedPendings: HasMany<typeof FixedPaymentPending>;
}
