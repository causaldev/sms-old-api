import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AttendanceLateAbsents extends BaseSchema {
  protected tableName = 'student_attendances';

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('absent_reason').defaultTo(null).after('date');
      table.dropColumn('late_reason');
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('absent_reason');
      table.string('late_reason').defaultTo(null);
    });
  }
}
