import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class RecurrentPayments extends BaseSchema {
  protected tableName = 'recurrent_payments';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.date('effective_date').notNullable();
      table.date('end_date').notNullable();
      table.string('description').notNullable().unique();
      table.integer('total_pay_count').notNullable().unsigned();
      table.boolean('archived').defaultTo(false);

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
