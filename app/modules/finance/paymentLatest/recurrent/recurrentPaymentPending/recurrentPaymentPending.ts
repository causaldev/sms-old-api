import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Grade from 'app/modules/academic/grade/grade';
import Student from 'app/modules/academic/student/student';
import Model from 'app/modules/_shared/model';
import RecurrentPayment from '../recurrentPayment';
import RecurrentPaymentChild from '../recurrentPaymentChild/recurrentPaymentChild';

export default class RecurrentPaymentPending extends Model {
  @column()
  public discount_amount: number;

  @column()
  public recurrent_payment_id: string;

  @column()
  public recurrent_payment_child_id: string;

  @column()
  public grade_id: string;

  @column()
  public student_id: string;

  @belongsTo(() => RecurrentPaymentChild, {
    foreignKey: 'recurrent_payment_child_id',
  })
  public recurrentPaymentChild: BelongsTo<typeof RecurrentPaymentChild>;

  @belongsTo(() => RecurrentPayment, {
    foreignKey: 'recurrent_payment_id',
  })
  public recurrentPayment: BelongsTo<typeof RecurrentPayment>;

  @belongsTo(() => Student, {
    foreignKey: 'student_id',
  })
  public student: BelongsTo<typeof Student>;

  @belongsTo(() => Grade, {
    foreignKey: 'grade_id',
  })
  public grade: BelongsTo<typeof Grade>;
}
