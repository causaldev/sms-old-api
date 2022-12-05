import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { Months } from 'app/modules/finance/payment/payment';

export default class FeePayments extends BaseSchema {
  protected tableName = 'fee_payments';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.decimal('fee', 15, 2).notNullable();
      table.enum('month', Object.values(Months)).notNullable();
      table.integer('attachment').notNullable();
      table.integer('fs').notNullable();
      table.decimal('cash', 15, 2);
      table
        .uuid('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('student_id')
        .notNullable()
        .references('id')
        .inTable('students')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('academic_year_id')
        .notNullable()
        .references('id')
        .inTable('academic_years')
        .onUpdate('cascade')
        .onDelete('cascade');
      table.boolean('hidden');
      table.date('slip_date');
      table.string('remark');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
