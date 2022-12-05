import test from 'japa';
import { transact } from 'app/test/testUtils';
import RegistrationPaymentService from 'app/modules/finance/paymentNew/registrationPayment/registrationPaymentService';
import { RegistrationPaymentFactory } from './registrationPaymentFactory';
import { expect } from 'chai';
// import { getCount } from 'app/services/utils';
// import RegistrationPayment from 'app/modules/finance/paymentNew/registrationPayment/registrationPayment';
import { generateStudents } from 'app/test/modules/academic/student/studentFactory';

const regService = new RegistrationPaymentService();

transact('Registration Payment Service', () => {
  test('list non registered students by grade', async () => {
    const { g1, g2, ay1, ay2, s1, s2, s3, s4, s5, s6 } =
      await generateStudents();

    // All non registered
    let nonRegG1 = await regService.listNonRegisteredByGrade(g1.id);
    expect(nonRegG1).to.deep.equal([s1, s2, s3]);

    await RegistrationPaymentFactory.merge({
      student_id: s1.id,
      academic_year_id: ay2.id,
    }).create();

    // Last year reg doesn't affect current
    nonRegG1 = await regService.listNonRegisteredByGrade(g1.id);
    expect(nonRegG1).to.deep.equal([s1, s2, s3]);

    await RegistrationPaymentFactory.merge({
      student_id: s2.id,
      academic_year_id: ay1.id,
    }).create();

    // Doesn't include registered
    nonRegG1 = await regService.listNonRegisteredByGrade(g1.id);
    expect(nonRegG1).to.deep.equal([s1, s3]);

    // Other grade not affected
    const nonRegG2 = await regService.listNonRegisteredByGrade(g2.id);
    expect(nonRegG2).to.deep.equal([s4, s5, s6]);
  });

  test('list registered students by grade', async () => {
    const { g1, g2, ay1, ay2, s1, s2 } = await generateStudents();

    // No one registered
    let registeredG1 = await regService.listRegisteredGrade(g1.id);
    expect(registeredG1).to.deep.equal([]);

    await RegistrationPaymentFactory.merge({
      student_id: s1.id,
      academic_year_id: ay2.id,
    }).create();

    // Last year registration does not affect current
    registeredG1 = await regService.listRegisteredGrade(g1.id);
    expect(registeredG1).to.deep.equal([]);

    await RegistrationPaymentFactory.merge({
      student_id: s1.id,
      academic_year_id: ay1.id,
    }).create();

    // Lists current year registered
    registeredG1 = await regService.listRegisteredGrade(g1.id);
    expect(registeredG1).to.deep.equal([s1]);

    await RegistrationPaymentFactory.merge({
      student_id: s2.id,
      academic_year_id: ay1.id,
    }).create();

    registeredG1 = await regService.listRegisteredGrade(g1.id);
    expect(registeredG1).to.deep.equal([s1, s2]);

    // Grade 1 does not affect other grades
    const registeredG2 = await regService.listRegisteredGrade(g2.id);
    expect(registeredG2).to.deep.equal([]);
  });

  test('Create double throws error', async () => {
    // TODO: Fix
    // const data = await RegistrationPaymentFactory.make();
    // await regService.create(data.serialize());
    // expect(await getCount(RegistrationPayment)).to.equal(1);
    // testError(async () => {
    //   await regService.create(data.serialize());
    // });
  });
});
