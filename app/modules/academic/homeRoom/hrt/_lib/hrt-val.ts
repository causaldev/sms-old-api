import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export class AssignHrtVal extends Validator {
  public schema = schema.create({
    grade_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'grades',
      }),
    ]),
    user_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'users',
      }),
      rules.unique({
        table: 'hrts',
        column: 'user_id',
        where: {
          grade_id: this.body.grade_id,
        },
      }),
    ]),
  });

  public messages = {
    ...this.messages,
    'user_id.unique': 'user already assigned to class',
  };
}
