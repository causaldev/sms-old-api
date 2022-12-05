import Factory from '@ioc:Adonis/Lucid/Factory';
import RegistrationPayment from 'app/modules/finance/paymentNew/registrationPayment/registrationPayment';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import { StudentFactory } from 'app/test/modules/academic/student/studentFactory';
import { UserFactory } from 'app/test/modules/auth/userFactory';
import { DateTime } from 'luxon';

export const RegistrationPaymentFactory = Factory.define(
  RegistrationPayment,
  ({ faker }) => {
    return {
      fee: faker.datatype.number({ min: 1000, max: 3000 }),
      attachment: faker.datatype.number({ min: 1000, max: 3000 }),
      fs: faker.datatype.number({ min: 1000, max: 3000 }),
      cash: faker.datatype.number({ min: 1000, max: 3000 }),
      user_id: faker.lorem.sentence(),
      student_id: faker.lorem.sentence(),
      academic_year_id: faker.lorem.sentence(),
      hidden: faker.datatype.boolean(),
      slip_date: faker.date
        .recent()
        .toISOString()
        .substring(0, 10) as unknown as DateTime,
      remark: faker.lorem.sentence(),
    };
  }
)
  .relation('user', () => UserFactory)
  .relation('academicYear', () => AcademicYearFactory)
  .relation('student', () => StudentFactory)
  .build();
