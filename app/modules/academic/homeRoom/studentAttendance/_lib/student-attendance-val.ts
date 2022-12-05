import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import { AttendanceTypes } from '../student-attendance';

export class CreateStudentAttendanceVal extends Validator {
  public schema = schema.create({
    data: schema.array([rules.distinct('*')]).members(
      schema.object().members({
        student_id: schema.string({}, [
          rules.exists({
            column: 'id',
            table: 'students',
          }),
          // TODO: Add student belongs to grade validation
        ]),
        status: schema.enum(Object.values(AttendanceTypes)),
        absent_reason: schema.string.optional({}, []),
      })
    ),
    date: schema.date({
      format: 'yyyy-MM-dd',
    }),
  });
}
