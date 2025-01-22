import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class EvaluationTypes extends BaseSchema {
  protected tableName = 'evaluation_types';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.string('name').notNullable().unique();
      table.float('weight').notNullable();

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
