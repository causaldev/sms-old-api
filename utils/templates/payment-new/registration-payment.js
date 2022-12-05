const modelName = 'RegistrationPayment';
const folder = 'finance/paymentNew/registrationPayment';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/finance/payment/registration-payments',
  model: [
    {
      field: 'fee',
      type: 'number',
      subtype: 'decimal',
      required: true,
      editable: true,
      factory: 'faker.datatype.number({ min: 1000, max: 3000 })',
    },
    {
      field: 'attachment',
      type: 'number',
      subtype: 'integer',
      required: true,
      editable: true,
      factory: 'faker.datatype.number({ min: 1000, max: 3000 })',
    },
    {
      field: 'fs',
      type: 'number',
      subtype: 'integer',
      required: true,
      editable: true,
      factory: 'faker.datatype.number({ min: 1000, max: 3000 })',
    },
    {
      field: 'cash',
      type: 'number',
      subtype: 'decimal',
      required: false,
      editable: true,
      factory: 'faker.datatype.number({ min: 1000, max: 3000 })',
    },
    {
      field: 'user_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'users',
      },
    },
    {
      field: 'student_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'students',
      },
    },
    {
      field: 'academic_year_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: false,
      foreign: {
        column: 'id',
        table: 'academic_years',
      },
    },
    {
      field: 'hidden',
      type: 'boolean',
      required: false,
      editable: true,
    },
    {
      field: 'slip_date',
      type: 'date',
      required: false,
      editable: true,
    },
    {
      field: 'remark',
      type: 'string',
      required: false,
      editable: true,
    },
  ],
  routes: {
    prefix: 'registration-payments',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-registration-payment',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-registration-payment',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-registration-payment',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-registration-payment',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-registration-payment',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-registration-payment',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-registration-payment',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-registration-payment',
      },
    ],
  },
  roles: [
    'add-registration',
    'edit-registration',
    'remove-registration',
    'view-registration',
  ],
};
