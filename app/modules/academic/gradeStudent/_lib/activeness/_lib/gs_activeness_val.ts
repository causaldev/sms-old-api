import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export class CreateGsActivenessVal extends Validator {
  public schema = schema.create({
    academic_year_id: schema.string({}, [
      rules.exists({
        table: 'academic_years',
        column: 'id',
      }),
      // Add unique validation
      // rules.uniqueCompound
    ]),
    fixed_payment_id: schema.string({}, [
      rules.exists({
        table: 'fixed_payments',
        column: 'id',
      }),
    ]),
    grade_ids: schema.array().members(
      schema.string({}, [
        rules.exists({
          table: 'grades',
          column: 'id',
        }),
      ])
    ),
  });
}
