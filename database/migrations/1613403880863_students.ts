import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { Gender } from 'app/modules/_shared/types';

export default class Students extends BaseSchema {
  protected tableName = 'students';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.string('first_name').notNullable();
      table.string('father_name').notNullable();
      table.enum('gender', Object.values(Gender)).notNullable();
      table.string('grand_father_name');
      table.string('id_number').unique();
      table.string('primary_phone');
      table.text('img', 'longtext');
      table.decimal('scholarship_amount', 15, 2).defaultTo(0);
      table.integer('age');
      table.date('date_of_birth');
      table.enum('status', ['Active', 'Inactive']).defaultTo('Active');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
