import Validator from 'app/modules/_shared/validator';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class ChangeStudentGradeVal extends Validator {
  public schema = schema.create({
    grade_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'grades',
      }),
    ]),
    student_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'students',
      }),
    ]),
  });
}
