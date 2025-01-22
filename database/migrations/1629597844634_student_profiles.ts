import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import {
  HealthTypes,
  SchoolLeaveReason,
} from 'app/modules/academic/studentProfile/studentProfile';
import { LifeCondition } from 'app/modules/_shared/types';

export default class StudentProfiles extends BaseSchema {
  protected tableName = 'student_profiles';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.string('nationality');
      table.string('address_city');
      table.string('address_sub_city');
      table.string('address_woreda');
      table.string('house_number');
      table.string('student_phone_number');
      table.string('other_health_status');
      table.string('previous_school_name');
      table.string('previous_school_city');
      table.string('previous_school_sub_city');
      table.string('previous_school_woreda');
      table.string('school_leave_other');
      table.string('entry_class');
      table.string('parent_name');
      table.string('occupation');
      table.string('work_place');
      table.string('parent_phone_number');
      table.string('student_living_with');
      table.date('date_of_birth');
      table.text('student_photo');
      table.text('parent_photo');
      table.text('emergencies');
      table
        .uuid('student_id')
        .notNullable()
        .references('id')
        .inTable('students')
        .onUpdate('cascade')
        .onDelete('cascade')
        .index();
      table.enum('health_status', Object.values(HealthTypes));
      table.enum(
        'previous_school_leave_reason',
        Object.values(SchoolLeaveReason)
      );
      table.enum('father_condition', Object.values(LifeCondition));
      table.enum('mother_condition', Object.values(LifeCondition));

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
