import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import {
  PenaltyFrequency,
  PenaltyType,
} from 'app/modules/finance/paymentLatest/lib/payment-types';

export default class RecurrentPaymentChildren extends BaseSchema {
  protected tableName = 'recurrent_payment_children';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.date('start_date').notNullable();
      table.date('end_date').notNullable();
      table.integer('order').unsigned();
      table.decimal('amount', 15, 2).notNullable();
      table.string('description').notNullable();
      table.boolean('has_penalty').notNullable();
      table.integer('no_penalty_days');
      table.enum('penalty_type', Object.values(PenaltyType));
      table.decimal('penalty_amount', 15, 2);
      table.enum('penalty_frequency', Object.values(PenaltyFrequency));
      table.integer('penalty_reapply_days');
      table.integer('max_penalty');
      table.integer('max_penalty_apply_days');
      table.boolean('archived').defaultTo(false);

      table
        .uuid('recurrent_payment_id')
        .notNullable()
        .references('id')
        .inTable('recurrent_payments')
        .onUpdate('cascade')
        .onDelete('cascade');

      table.unique(
        ['recurrent_payment_id', 'order', 'description'],
        'rec_order_unique'
      );

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
