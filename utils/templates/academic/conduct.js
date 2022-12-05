const modelName = 'Conduct';
const folder = 'academic/student/conduct';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/conducts',
  model: [
    {
      field: 'conduct',
      type: 'string',
      required: false,
      editable: false,
    },
    {
      field: 'grade_student_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'grade_students',
      },
    },
    {
      field: 'quarter_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'quarters',
      },
    },
  ],
  routes: {
    prefix: 'conducts',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-student',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-student',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-student',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-student',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-student',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-student',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-student',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-student',
      },
    ],
  },
  roles: ['add-student', 'edit-student', 'remove-student', 'view-student'],
};
