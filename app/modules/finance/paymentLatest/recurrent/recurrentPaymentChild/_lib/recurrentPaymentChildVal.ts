import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import { PenaltyFrequency, PenaltyType } from '../../../lib/payment-types';

export class RecurrentPaymentChildEdit extends Validator {
  public schema = schema.create({
    start_date: schema.date.optional({
      format: 'yyyy-MM-dd',
    }),
    end_date: schema.date.optional(
      {
        format: 'yyyy-MM-dd',
      },
      []
    ),
    amount: schema.number.optional([rules.unsigned()]),
    description: schema.string.optional({}, [
      rules.unique({
        table: 'fixed_payments',
        column: 'description',
        whereNot: {
          id: this.ctx.request.params().id,
        },
      }),
    ]),
    has_penalty: schema.boolean.optional(),
    no_penalty_days: schema.number.optional([rules.unsigned()]),
    penalty_type: schema.enum.optional(Object.values(PenaltyType)),
    penalty_amount: schema.number.optional(),
    penalty_frequency: schema.enum.optional(Object.values(PenaltyFrequency)),
    penalty_reapply_days: schema.number.optional([rules.unsigned()]),
    max_penalty: schema.number.optional([rules.unsigned()]),
    max_penalty_apply_days: schema.number.optional([rules.unsigned()]),
  });
}
