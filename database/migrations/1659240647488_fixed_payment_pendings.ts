import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class FixedPaymentPendings extends BaseSchema {
  protected tableName = 'fixed_payment_pendings';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.decimal('discount_amount', 15, 2);

      table
        .uuid('fixed_payment_id')
        .notNullable()
        .references('id')
        .inTable('fixed_payments')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('grade_id')
        .notNullable()
        .references('id')
        .inTable('grades')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('student_id')
        .notNullable()
        .references('id')
        .inTable('students')
        .onUpdate('cascade')
        .onDelete('cascade');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
