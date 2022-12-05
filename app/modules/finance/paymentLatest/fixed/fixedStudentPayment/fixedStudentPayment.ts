import { DateTime } from 'luxon';
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import FixedPayment from '../fixedPayment';
import User from 'app/modules/auth/user';
import Student from 'app/modules/academic/student/student';
import Grade from 'app/modules/academic/grade/grade';

export default class FixedStudentPayment extends Model {
  @column()
  public amount: number;

  @column()
  public penalty: number;

  @column()
  public total: number;

  @column()
  public discount: number;

  @column()
  public fs: string;

  @column()
  public attachment: number;

  @column()
  public cash: number;

  @column.date()
  public slip_date: DateTime | null;

  @column()
  public remark: string;

  @column()
  public fixed_payment_id: string;

  @column()
  public user_id: string;

  @column()
  public grade_id: string;

  @column()
  public student_id: string;

  @belongsTo(() => FixedPayment, {
    foreignKey: 'fixed_payment_id',
  })
  public fixedPayment: BelongsTo<typeof FixedPayment>;

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Student, {
    foreignKey: 'student_id',
  })
  public student: BelongsTo<typeof Student>;

  @belongsTo(() => Grade, {
    foreignKey: 'grade_id',
  })
  public grade: BelongsTo<typeof Grade>;
}
