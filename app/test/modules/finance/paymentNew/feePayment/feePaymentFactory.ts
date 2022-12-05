import Factory from '@ioc:Adonis/Lucid/Factory';
import { Months } from 'app/modules/finance/payment/payment';
import FeePayment from 'app/modules/finance/paymentNew/feePayment/feePayment';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import { StudentFactory } from 'app/test/modules/academic/student/studentFactory';
import { UserFactory } from 'app/test/modules/auth/userFactory';
import { getRandomItem } from 'app/test/testUtils';
import { DateTime } from 'luxon';

export const FeePaymentFactory = Factory.define(FeePayment, ({ faker }) => {
  return {
    fee: faker.datatype.number({ min: 1000, max: 3000 }),
    month: getRandomItem(Object.values(Months)),
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
})
  .relation('user', () => UserFactory)
  .relation('academicYear', () => AcademicYearFactory)
  .relation('student', () => StudentFactory)
  .build();
