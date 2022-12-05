import { column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import AcademicYear from 'app/modules/academic/academicYear/academicYear';
import Student from 'app/modules/academic/student/student';
import User from 'app/modules/auth/user';
import Model from 'app/modules/_shared/model';
import { DateTime } from 'luxon';
import { Months } from '../../payment/payment';

export default class FeePayment extends Model {
  @column()
  public fee: number;

  @column()
  public month: Months;

  @column()
  public attachment: number;

  @column()
  public fs: number;

  @column()
  public cash: number;

  @column()
  public user_id: string;

  @column()
  public student_id: string;

  @column()
  public academic_year_id: string;

  @column()
  public hidden: boolean;

  @column.date()
  public slip_date: DateTime;

  @column()
  public remark: string;

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Student, {
    foreignKey: 'student_id',
  })
  public student: BelongsTo<typeof Student>;

  @belongsTo(() => AcademicYear, {
    foreignKey: 'academic_year_id',
  })
  public academicYear: BelongsTo<typeof AcademicYear>;
}
