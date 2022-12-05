import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import {
  SubjectDisplay,
  SubjectReportTemplate,
} from 'app/modules/academic/marklist/subject/subject';

export default class SubjectMods extends BaseSchema {
  protected tableName = 'subjects';

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('order').defaultTo(0);
      table
        .enum('display_mode', Object.values(SubjectDisplay))
        .defaultTo(SubjectDisplay.Number);
      table.boolean('show_on_report').defaultTo(true);
      table
        .string('report_card_template')
        .nullable()
        .defaultTo(SubjectReportTemplate.Main);
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('order');
      table.dropColumn('display_mode');
      table.dropColumn('show_on_report');
      table.dropColumn('report_card_template');
    });
  }
}
