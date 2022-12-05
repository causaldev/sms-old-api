import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import { PenaltyFrequency, PenaltyType } from '../../lib/payment-types';

export class RecurrentPaymentVal extends Validator {
  public schema = schema.create({
    effective_date: schema.date({
      format: 'yyyy-MM-dd',
    }),
    end_date: schema.date(
      {
        format: 'yyyy-MM-dd',
      },
      []
    ),
    description: schema.string({}, [
      rules.unique({
        table: 'recurrent_payments',
        column: 'description',
      }),
    ]),
    payments: schema.array([rules.minLength(2)]).members(
      schema.object().members({
        start_date: schema.date({
          format: 'yyyy-MM-dd',
        }),
        end_date: schema.date(
          {
            format: 'yyyy-MM-dd',
          },
          []
        ),
        order: schema.number([rules.unsigned()]),
        amount: schema.number([rules.unsigned()]),
        description: schema.string({}, [
          rules.unique({
            table: 'fixed_payments',
            column: 'description',
          }),
        ]),
        has_penalty: schema.boolean(),
        no_penalty_days: schema.number.optional([rules.unsigned()]),
        penalty_type: schema.enum.optional(Object.values(PenaltyType)),
        penalty_amount: schema.number.optional(),
        penalty_frequency: schema.enum.optional(
          Object.values(PenaltyFrequency)
        ),
        penalty_reapply_days: schema.number.optional([rules.unsigned()]),
        max_penalty: schema.number.optional([rules.unsigned()]),
        max_penalty_apply_days: schema.number.optional([rules.unsigned()]),
      })
    ),
  });

  public messages = {
    ...this.messages,
    'payments.minLength': 'There must be at least 2 payments',
  };
}

export class RecurrentPaymentEditVal extends Validator {
  public schema = schema.create({
    effective_date: schema.date.optional({
      format: 'yyyy-MM-dd',
    }),
    end_date: schema.date.optional(
      {
        format: 'yyyy-MM-dd',
      },
      []
    ),
    description: schema.string.optional({}, [
      rules.unique({
        table: 'recurrent_payments',
        column: 'description',
        whereNot: {
          id: this.ctx.request.params().id,
        },
      }),
    ]),
    archived: schema.boolean.optional(),
  });
}
