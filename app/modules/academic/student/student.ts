import {
  column,
  HasMany,
  hasMany,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm';
import Payment from 'app/modules/finance/payment/payment';
import RegistrationPayment from 'app/modules/finance/paymentNew/registrationPayment/registrationPayment';
import Model from 'app/modules/_shared/model';
import { Gender } from 'app/modules/_shared/types';
import { DateTime } from 'luxon';
import GradeStudent from '../gradeStudent/gradeStudent';
import StudentProfile from '../studentProfile/studentProfile';

export default class Student extends Model {
  @column()
  public first_name: string;

  @column()
  public father_name: string;

  @column()
  public gender: Gender;

  @column()
  public grand_father_name: string;

  @column()
  public id_number: string;

  @column()
  public primary_phone: string;

  @column()
  public img: string;

  @column.date()
  public date_of_birth?: DateTime;

  @column()
  public scholarship_amount: number;

  @column()
  public status: string;

  @column()
  public id_counter: number;

  @hasMany(() => GradeStudent, {
    foreignKey: 'student_id',
  })
  public gradeStudents: HasMany<typeof GradeStudent>;

  @hasMany(() => Payment, {
    foreignKey: 'student_id',
  })
  public payments: HasMany<typeof Payment>;

  @hasOne(() => StudentProfile, {
    foreignKey: 'student_id',
  })
  public profile: HasOne<typeof StudentProfile>;

  // @hasMany(() => RegistrationPayment, {
  //   foreignKey: 'student_id',
  // })
  // public registrationPayments: HasMany<typeof RegistrationPayment>;
}
