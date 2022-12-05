import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import FixedPayment from 'app/modules/finance/paymentLatest/fixed/fixedPayment';
import Model from 'app/modules/_shared/model';

export default class GradeStudentFixedActiveness extends Model {
  public static table = 'gs_activenesses';

  @column()
  public grade_id: string;

  @column()
  public academic_year_id: string;

  @column()
  public fixed_payment_id: string;

  @belongsTo(() => FixedPayment, {
    foreignKey: 'fixed_payment_id',
  })
  public fixedPayment: BelongsTo<typeof FixedPayment>;
}
