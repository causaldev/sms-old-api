import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class StudentIdDobs extends BaseSchema {
  protected tableName = 'students';

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('id_counter').defaultTo(0).after('id_number');
      table.dropColumn('age');
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('id_counter');
      table.integer('age').nullable();
    });
  }
}
