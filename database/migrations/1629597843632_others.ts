import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Others extends BaseSchema {
  protected tableName = 'others';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.text('reason').notNullable();
      table
        .uuid('payment_id')
        .notNullable()
        .references('id')
        .inTable('payments')
        .onUpdate('cascade')
        .onDelete('cascade')
        .index();

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
