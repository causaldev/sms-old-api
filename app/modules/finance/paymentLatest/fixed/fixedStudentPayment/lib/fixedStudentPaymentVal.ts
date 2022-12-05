import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export class FixedStudentPaymentVal extends Validator {
  public schema = schema.create({
    attachment: schema.number(),
    fs: schema.string({}, [rules.minLength(8), rules.maxLength(8)]),
    cash: schema.number.optional(),
    fixed_payment_pending_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'fixed_payment_pendings',
      }),
    ]),
    slip_date: schema.date.optional(),
    remark: schema.string.optional(),
    penalty: schema.number(),
  });
}
