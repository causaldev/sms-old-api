import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class GsActivenesses extends BaseSchema {
  protected tableName = 'gs_activenesses';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();
      table.collate('utf8_unicode_ci');

      table
        .uuid('grade_id')
        .notNullable()
        .references('id')
        .inTable('grades')
        .onUpdate('cascade')
        .onDelete('cascade');

      table
        .uuid('fixed_payment_id')
        .notNullable()
        .references('id')
        .inTable('fixed_payments')
        .onUpdate('cascade')
        .onDelete('cascade');

      table
        .uuid('academic_year_id')
        .notNullable()
        .references('id')
        .inTable('academic_years')
        .onUpdate('cascade')
        .onDelete('cascade');

      table.unique(['academic_year_id', 'grade_id']);

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
