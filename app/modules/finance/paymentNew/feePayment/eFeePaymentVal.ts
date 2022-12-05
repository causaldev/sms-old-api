import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import { Months } from '../../payment/payment';

export default class EFeePaymentVal extends Validator {
  public schema = schema.create({
    fee: schema.number.optional(),
    month: schema.enum.optional(Object.values(Months)),
    attachment: schema.number.optional(),
    fs: schema.number.optional(),
    cash: schema.number.optional(),
    user_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'users',
      }),
    ]),
    student_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'students',
      }),
    ]),
    hidden: schema.boolean.optional(),
    slip_date: schema.date.optional(),
    remark: schema.string.optional(),
  });
}
