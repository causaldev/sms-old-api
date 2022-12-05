import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import { SkillEvaluation } from './skill';

export default class CSkillVal extends Validator {
  public schema = schema.create({
    punctuality: schema.enum.optional(Object.values(SkillEvaluation)),
    anthem_participation: schema.enum.optional(Object.values(SkillEvaluation)),
    attendance: schema.enum.optional(Object.values(SkillEvaluation)),
    completing_work: schema.enum.optional(Object.values(SkillEvaluation)),
    follow_rules: schema.enum.optional(Object.values(SkillEvaluation)),
    english_use: schema.enum.optional(Object.values(SkillEvaluation)),
    listening: schema.enum.optional(Object.values(SkillEvaluation)),
    class_participation: schema.enum.optional(Object.values(SkillEvaluation)),
    handwriting: schema.enum.optional(Object.values(SkillEvaluation)),
    communication_book_use: schema.enum.optional(
      Object.values(SkillEvaluation)
    ),
    material_handling: schema.enum.optional(Object.values(SkillEvaluation)),
    cooperation: schema.enum.optional(Object.values(SkillEvaluation)),
    school_uniform: schema.enum.optional(Object.values(SkillEvaluation)),
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
