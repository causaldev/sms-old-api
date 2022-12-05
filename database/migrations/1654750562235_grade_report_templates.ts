import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { SubjectReportTemplate } from 'app/modules/academic/marklist/subject/subject';

export default class GradeReportTemplates extends BaseSchema {
  protected tableName = 'grades';

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table
        .string('report_card_template')
        .defaultTo(SubjectReportTemplate.Main)
        .after('summer_fee');
      table.string('skill_template').defaultTo('main').after('summer_fee');
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('report_card_template');
      table.dropColumn('skill_template');
    });
  }
}
