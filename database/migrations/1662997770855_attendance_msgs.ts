import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AttendanceMsgs extends BaseSchema {
  protected tableName = 'student_attendances';

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.boolean('msg_sent').defaultTo(false).after('late_reason');
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('msg_sent');
    });
  }
}
