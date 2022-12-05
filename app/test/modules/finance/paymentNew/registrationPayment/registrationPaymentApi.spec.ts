import RegistrationPayment from 'app/modules/finance/paymentNew/registrationPayment/registrationPayment';
import test from 'japa';
import { RegistrationPaymentFactory } from './registrationPaymentFactory';
import { ApiMethod, transact } from 'app/test/testUtils';
import {
  createsApi,
  deleteApi,
  indexApi,
  paginateApi,
  requiresAuth,
  requiresAuthorization,
  showApi,
  updatesApi,
  validateApi,
} from 'app/test/testUtils/api';

const apiUrl = '/finance/payment-new/registration-payments';
const roles = [
  'add-registration',
  'edit-registration',
  'remove-registration',
  'view-registration',
];

const factory = RegistrationPaymentFactory.with('user')
  .with('student')
  .with('academicYear', 1, (ayBuilder) => {
    ayBuilder.merge({ active: true });
  });

transact('RegistrationPayment show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: RegistrationPayment,
    });
  });
});

transact('RegistrationPayment paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: RegistrationPayment,
    });
  });
});

transact('RegistrationPayment index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: RegistrationPayment,
    });
  });
});

transact('RegistrationPayment create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      fee: 'required validation failed',
      attachment: 'required validation failed',
      fs: 'required validation failed',
      student_id: 'required validation failed',
    })
  );
  test('validate already registered', async () => {
    const data = await factory.create();

    await validateApi(
      apiUrl,
      roles,
      {
        fee: 'required validation failed',
        attachment: 'required validation failed',
        fs: 'required validation failed',
        student_id: 'already registered for current year',
      },
      {
        student_id: data.student_id,
      }
    )();
  });
  test('store', async () => {
    const data = await factory.merge({ hidden: true }).create();
    await data.delete();

    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data.serialize() },
      model: RegistrationPayment,
      assertionData: {
        hidden: false,
      },
    });
  });
});

transact('RegistrationPayment update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        fee: 'number validation failed',
        attachment: 'number validation failed',
        fs: 'number validation failed',
        cash: 'number validation failed',
        user_id: 'exists validation failure',
        student_id: 'exists validation failure',
        hidden: 'boolean validation failed',
        slip_date: 'the input "some data" can\'t be parsed as ISO 8601',
        remark: 'string validation failed',
      },
      {
        fee: 'some data',
        attachment: 'some data',
        fs: 'some data',
        cash: 'some data',
        user_id: 100,
        student_id: 100,
        hidden: 'some data',
        slip_date: 'some data',
        remark: 100,
      },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await RegistrationPayment.findOrFail(itemF.id)).serialize();
    const updateF = await factory.merge({ hidden: false }).create();
    const updateData = (
      await RegistrationPayment.findOrFail(updateF.id)
    ).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: RegistrationPayment,
      item,
      updateData,
      updateFields: [
        'fee',
        'attachment',
        'fs',
        'cash',
        'user_id',
        'student_id',
        'hidden',
        'slip_date',
        'remark',
      ],
      assertionData: {
        hidden: 0,
      },
    });
  });
});

transact('RegistrationPayment delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: RegistrationPayment,
      itemId: items[0].id,
    });
  });
});
