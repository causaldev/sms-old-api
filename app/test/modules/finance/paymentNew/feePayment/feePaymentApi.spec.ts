import FeePayment from 'app/modules/finance/paymentNew/feePayment/feePayment';
import test from 'japa';
import { FeePaymentFactory } from './feePaymentFactory';
import { ApiMethod, transact } from 'app/test/testUtils';
import {
  createsApi,
  deleteApi,
  // generateEncoded,
  indexApi,
  paginateApi,
  requiresAuth,
  requiresAuthorization,
  showApi,
  // updatesApi,
  validateApi,
} from 'app/test/testUtils/api';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';

const apiUrl = '/finance/payment-new/fee-payments';
const roles = ['add-fee', 'edit-fee', 'remove-fee', 'view-fee'];

const factory = FeePaymentFactory.with('user')
  .with('student')
  .with('academicYear');

// transact('Paid months', () => {
//   test.only('returns non paid months', async () => {
//     const encoded = await generateEncoded(roles);
//   })
// })

transact('FeePayment show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: FeePayment,
    });
  });
});

transact('FeePayment paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: FeePayment,
    });
  });
});

transact('FeePayment index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: FeePayment,
    });
  });
});

transact('FeePayment create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      fee: 'required validation failed',
      month: 'required validation failed',
      attachment: 'required validation failed',
      fs: 'required validation failed',
      student_id: 'required validation failed',
    })
  );
  test('store', async () => {
    await AcademicYearFactory.merge({ active: true }).create();
    const data = await factory.merge({ hidden: false }).create();
    await data.delete();

    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data.serialize(), hidden: false },
      model: FeePayment,
      assertionData: {
        hidden: false,
      },
    });
  });
});

transact('FeePayment update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  // TODO: Handle
  // test(
  //   'validate',
  //   validateApi(
  //     `${apiUrl}/id`,
  //     roles,
  //     {
  //       fee: 'number validation failed',
  //       month: 'enum validation failed',
  //       attachment: 'number validation failed',
  //       fs: 'number validation failed',
  //       cash: 'number validation failed',
  //       user_id: 'string validation failed',
  //       student_id: 'string validation failed',
  //       hidden: 'boolean validation failed',
  //       slip_date: 'date validation failed',
  //       remark: 'string validation failed',
  //     },
  //     {
  //       fee: 'some data',
  //       month: 'some data',
  //       attachment: 'some data',
  //       fs: 'some data',
  //       cash: 'some data',
  //       user_id: 100,
  //       student_id: 100,
  //       hidden: 'some data',
  //       slip_date: 'some data',
  //       remark: 100,
  //     },
  //     ApiMethod.PATCH
  //   )
  // );
  // test('update', async () => {
  //   const itemF = await factory.create();
  //   const item = (await FeePayment.findOrFail(itemF.id)).serialize();
  //   const updateF = await factory.create();
  //   const updateData = (await FeePayment.findOrFail(updateF.id)).serialize();
  //   await updateF.delete();

  //   return updatesApi({
  //     url: apiUrl,
  //     roles: roles,
  //     model: FeePayment,
  //     item,
  //     updateData,
  //     updateFields: [
  //       'fee',
  //       'month',
  //       'attachment',
  //       'fs',
  //       'cash',
  //       'user_id',
  //       'student_id',
  //       'hidden',
  //       'slip_date',
  //       'remark',
  //     ],
  //     assertionData: {},
  //   });
  // });
});

transact('FeePayment delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: FeePayment,
      itemId: items[0].id,
    });
  });
});
