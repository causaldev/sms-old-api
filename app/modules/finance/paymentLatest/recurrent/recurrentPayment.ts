import { DateTime } from 'luxon';
import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import RecurrentPaymentChild from './recurrentPaymentChild/recurrentPaymentChild';
import RecurrentStudentPayment from './recurrentStudentPayment/recurrentStudentPayment';
import Model from 'app/modules/_shared/model';

export default class RecurrentPayment extends Model {
  @column.date()
  public effective_date: DateTime;

  @column.date()
  public end_date: DateTime;

  @column()
  public description: string;

  @column()
  public total_pay_count: number;

  @column()
  public archived: boolean;

  @hasMany(() => RecurrentPaymentChild, {
    foreignKey: 'recurrent_payment_id',
  })
  public recurrentChildren: HasMany<typeof RecurrentPaymentChild>;

  @hasMany(() => RecurrentStudentPayment, {
    foreignKey: 'recurrent_payment_id',
  })
  public studentPayments: HasMany<typeof RecurrentStudentPayment>;
}
