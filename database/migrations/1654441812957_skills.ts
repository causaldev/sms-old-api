import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { SkillEvaluation } from 'app/modules/academic/student/skill/skill';

export default class Skills extends BaseSchema {
  protected tableName = 'skills';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.enum('punctuality', Object.values(SkillEvaluation));
      table.enum('anthem_participation', Object.values(SkillEvaluation));
      table.enum('attendance', Object.values(SkillEvaluation));
      table.enum('completing_work', Object.values(SkillEvaluation));
      table.enum('follow_rules', Object.values(SkillEvaluation));
      table.enum('english_use', Object.values(SkillEvaluation));
      table.enum('listening', Object.values(SkillEvaluation));
      table.enum('class_participation', Object.values(SkillEvaluation));
      table.enum('handwriting', Object.values(SkillEvaluation));
      table.enum('communication_book_use', Object.values(SkillEvaluation));
      table.enum('material_handling', Object.values(SkillEvaluation));
      table.enum('cooperation', Object.values(SkillEvaluation));
      table.enum('school_uniform', Object.values(SkillEvaluation));

      table
        .uuid('grade_student_id')
        .notNullable()
        .references('id')
        .inTable('grade_students')
        .onUpdate('cascade')
        .onDelete('cascade');

      table
        .uuid('quarter_id')
        .notNullable()
        .references('id')
        .inTable('quarters')
        .onUpdate('cascade')
        .onDelete('cascade');

      // table.unique(['grade_student_id', 'quarter_id']);

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
