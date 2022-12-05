import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CConductVal extends Validator {
  public schema = schema.create({
    conduct: schema.string.optional(),
    grade_student_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'grade_students',
      }),
    ]),
    quarter_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'quarters',
      }),
    ]),
  });
}
