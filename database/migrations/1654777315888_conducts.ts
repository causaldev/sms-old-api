import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Conducts extends BaseSchema {
  protected tableName = 'conducts';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.string('conduct');
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

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
