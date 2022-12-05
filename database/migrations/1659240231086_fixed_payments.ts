import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import {
  PenaltyFrequency,
  PenaltyType,
} from 'app/modules/finance/paymentLatest/lib/payment-types';

export default class FixedPayments extends BaseSchema {
  protected tableName = 'fixed_payments';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.date('effective_date').notNullable();
      table.date('end_date').notNullable();
      table.decimal('amount', 15, 2).notNullable();
      table.string('description').notNullable().unique();
      table.boolean('has_penalty').notNullable();
      table.integer('no_penalty_days');
      table.enum('penalty_type', Object.values(PenaltyType));
      table.decimal('penalty_amount', 15, 2);
      table.enum('penalty_frequency', Object.values(PenaltyFrequency));
      table.integer('penalty_reapply_days');
      table.integer('max_penalty');
      table.integer('max_penalty_apply_days');
      table.boolean('archived').defaultTo(false);

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
