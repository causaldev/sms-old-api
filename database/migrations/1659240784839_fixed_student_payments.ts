import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class FixedStudentPayments extends BaseSchema {
  protected tableName = 'fixed_student_payments';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.decimal('amount', 15, 2).notNullable();
      table.decimal('penalty', 15, 2).defaultTo(0);
      table.decimal('total', 15, 2).notNullable();
      table.decimal('discount', 15, 2).defaultTo(0);
      table.string('fs').notNullable();
      table.integer('attachment').notNullable();
      table.decimal('cash', 15, 2).defaultTo(0);
      table.date('slip_date');
      table.string('remark');

      table
        .uuid('fixed_payment_id')
        .notNullable()
        .references('id')
        .inTable('fixed_payments')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
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

      table.unique(['fixed_payment_id', 'student_id']);

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
