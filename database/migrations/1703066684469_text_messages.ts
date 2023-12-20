import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class TextMessages extends BaseSchema {
  protected tableName = 'text_messages';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.string('entity_id').notNullable().unique();
      table.boolean('msg_sent').defaultTo(false);
      table.text('message').notNullable();
      table.string('phone').notNullable();
      table.string('parent_resource_id');
      table.string('msg_type');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
