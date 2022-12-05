import { Months } from 'app/modules/finance/payment/payment';
import FeePaymentRepo from 'app/modules/finance/paymentNew/feePayment/feePaymentRepo';
import { generateStudents } from 'app/test/modules/academic/student/studentFactory';
import { transact } from 'app/test/testUtils';
import { expect } from 'chai';
import test from 'japa';
import { FeePaymentFactory } from './feePaymentFactory';

const repo = new FeePaymentRepo();

transact('FeePaymentRepo.nonPaidMonths', () => {
  test('returns non paid months', async () => {
    const { s1, s2, ay1, ay2 } = await generateStudents();
    const months = Object.values(Months);

    await FeePaymentFactory.merge({
      student_id: s2.id,
      academic_year_id: ay1.id,
    }).create();

    // returns all for diff student
    expect(await repo.nonPaidMonths(s1.id)).to.deep.equal(months);

    await FeePaymentFactory.merge({
      student_id: s1.id,
      academic_year_id: ay2.id,
    }).create();

    // returns all for diff year
    expect(await repo.nonPaidMonths(s1.id)).to.deep.equal(months);

    await FeePaymentFactory.merge({
      student_id: s1.id,
      academic_year_id: ay1.id,
      month: Months.Tikimt,
    }).create();

    // Return filtered month
    const nonPaidMonths = [...months];
    nonPaidMonths.splice(1, 1);
    expect(await repo.nonPaidMonths(s1.id)).to.deep.equal(nonPaidMonths);
  });
});

transact('FeePaymentRepo.monthPaid', () => {
  test('returns false on non-paid true on paid', async () => {
    const { s1, s2, ay1, ay2 } = await generateStudents();

    expect(await repo.monthPaid(s1.id, Months.Meskerem)).to.be.false;
    expect(await repo.monthPaid(s1.id, Months.Tikimt)).to.be.false;

    await FeePaymentFactory.merge({
      academic_year_id: ay2.id,
      student_id: s1.id,
      month: Months.Meskerem,
    }).create();

    // False for previous year same student
    expect(await repo.monthPaid(s1.id, Months.Meskerem)).to.be.false;
    expect(await repo.monthPaid(s1.id, Months.Tikimt)).to.be.false;

    await FeePaymentFactory.merge({
      academic_year_id: ay1.id,
      student_id: s2.id,
      month: Months.Meskerem,
    }).create();

    // False for same year d/t student
    expect(await repo.monthPaid(s1.id, Months.Meskerem)).to.be.false;
    expect(await repo.monthPaid(s1.id, Months.Tikimt)).to.be.false;

    await FeePaymentFactory.merge({
      academic_year_id: ay1.id,
      student_id: s1.id,
      month: Months.Tikimt,
    }).create();

    // true
    expect(await repo.monthPaid(s1.id, Months.Meskerem)).to.be.false;
    expect(await repo.monthPaid(s1.id, Months.Tikimt)).to.be.true;
  });
});
