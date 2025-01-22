import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Subjects extends BaseSchema {
  protected tableName = 'subjects';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.string('subject').notNullable().unique();
      table.string('code').notNullable().unique();
      table.boolean('consider_for_rank').notNullable().defaultTo(true);

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
