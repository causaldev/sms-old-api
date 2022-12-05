import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class GradeStudentActives extends BaseSchema {
  protected tableName = 'grade_students';

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.boolean('active').defaultTo(false).after('student_id');
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('active');
    });
  }
}
