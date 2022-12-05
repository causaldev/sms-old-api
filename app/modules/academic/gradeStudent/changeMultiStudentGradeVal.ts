import Validator from 'app/modules/_shared/validator';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class ChangeMultiStudentGradeVal extends Validator {
  public schema = schema.create({
    grade_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'grades',
      }),
    ]),
    year_id: schema.string({}, [
      rules.exists({ column: 'id', table: 'academic_years' }),
    ]),
    student_ids: schema.array().members(
      schema.string({}, [
        rules.exists({
          column: 'id',
          table: 'students',
        }),
      ])
    ),
  });
}
