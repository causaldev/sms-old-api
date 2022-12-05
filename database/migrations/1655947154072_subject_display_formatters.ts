import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { DEFAULT_DISPLAY_RULE } from 'app/modules/academic/marklist/subject/subject';

export default class SubjectDisplayFormatters extends BaseSchema {
  protected tableName = 'subjects';

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table
        .string('display_rules')
        .defaultTo(JSON.stringify(DEFAULT_DISPLAY_RULE))
        .after('order');
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('display_rules');
    });
  }
}
