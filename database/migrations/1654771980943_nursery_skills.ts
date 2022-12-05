import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class NurserySkills extends BaseSchema {
  protected tableName = 'nursery_skills';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.string('acknowledges');
      table.string('greets');
      table.string('works_with_others');
      table.string('responds');
      table.string('accepts_responsibility');
      table.string('obeys_quickly');
      table.string('completes_work');
      table.string('listens_and_follows');
      table.string('work_independently');
      table.string('vocabulary_improvement');

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

      table.unique(['grade_student_id', 'quarter_id']);

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
