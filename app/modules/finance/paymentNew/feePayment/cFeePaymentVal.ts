import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import { Months } from '../../payment/payment';

export default class CFeePaymentVal extends Validator {
  public schema = schema.create({
    fee: schema.number(),
    month: schema.enum(Object.values(Months)),
    attachment: schema.number(),
    fs: schema.number(),
    cash: schema.number.optional(),
    student_id: schema.string({}, [
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
