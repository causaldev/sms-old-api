import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export class FixedPaymentPendingVal extends Validator {
  public schema = schema.create({
    fixed_payment_id: schema.string({}, [
      rules.exists({
        table: 'fixed_payments',
        column: 'id',
      }),
    ]),
    students: schema.array().members(
      schema.object().members({
        student_id: schema.string({}, [
          rules.exists({
            table: 'students',
            column: 'id',
          }),
        ]),
        grade_id: schema.string({}, [
          rules.exists({
            table: 'grades',
            column: 'id',
          }),
        ]),
      })
    ),
  });
}

export class FixedPendingAssignStudentVal extends Validator {
  public schema = schema.create({
    student_id: schema.string({}, [
      rules.exists({
        table: 'students',
        column: 'id',
      }),
      rules.custom('fixedStudentInPending', 'Student already in pending'),
      rules.custom('fixedStudentPaid', 'Student already paid'),
    ]),
    grade_id: schema.string({}, [
      rules.exists({
        table: 'grades',
        column: 'id',
      }),
    ]),
    fixed_payment_id: schema.string({}, [
      rules.exists({
        table: 'fixed_payments',
        column: 'id',
      }),
    ]),
  });
}
