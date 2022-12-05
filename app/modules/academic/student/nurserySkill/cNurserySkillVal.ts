import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CNurserySkillVal extends Validator {
  public schema = schema.create({
    acknowledges: schema.string.optional(),
    greets: schema.string.optional(),
    works_with_others: schema.string.optional(),
    responds: schema.string.optional(),
    accepts_responsibility: schema.string.optional(),
    obeys_quickly: schema.string.optional(),
    completes_work: schema.string.optional(),
    listens_and_follows: schema.string.optional(),
    work_independently: schema.string.optional(),
    vocabulary_improvement: schema.string.optional(),
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
