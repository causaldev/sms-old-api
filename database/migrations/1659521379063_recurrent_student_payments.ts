import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class RecurrentStudentPayments extends BaseSchema {
  protected tableName = 'recurrent_student_payments';

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
        .uuid('recurrent_payment_id')
        .notNullable()
        .references('id')
        .inTable('recurrent_payments')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('recurrent_payment_child_id')
        .notNullable()
        .references('id')
        .inTable('recurrent_payment_children')
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

      table.unique(
        ['recurrent_payment_id', 'recurrent_payment_child_id', 'student_id'],
        'rec_student_pay'
      );

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
