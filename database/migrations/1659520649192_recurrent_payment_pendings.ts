import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class RecurrentPaymentPendings extends BaseSchema {
  protected tableName = 'recurrent_payment_pendings';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.decimal('discount_amount', 15, 2);

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
        [
          'recurrent_payment_child_id',
          'recurrent_payment_id',
          'grade_id',
          'student_id',
        ],
        'rec_student_pending'
      );

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
