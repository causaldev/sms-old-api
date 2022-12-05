import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export class CreateTeacherVal extends Validator {
  public schema = schema.create({
    user_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'users',
      }),
      rules.unique({
        table: 'teachers',
        column: 'user_id',
      }),
    ]),
  });
}
