const modelName = 'Skill';
const folder = 'academic/student/skill';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/skills',
  model: [
    {
      field: 'punctuality',
      type: 'enum',
      required: false,
      editable: false,
    },
    {
      field: 'anthem_participation',
      type: 'enum',
      required: false,
      editable: false,
    },
    {
      field: 'attendance',
      type: 'enum',
      required: false,
      editable: false,
    },
    {
      field: 'completing_work',
      type: 'enum',
      required: false,
      editable: false,
    },
    {
      field: 'follow_rules',
      type: 'enum',
      required: false,
      editable: false,
    },
    {
      field: 'english_use',
      type: 'enum',
      required: false,
      editable: false,
    },
    {
      field: 'listening',
      type: 'enum',
      required: false,
      editable: false,
    },
    {
      field: 'class_participation',
      type: 'enum',
      required: false,
      editable: false,
    },
    {
      field: 'handwriting',
      type: 'enum',
      required: false,
      editable: false,
    },
    {
      field: 'communication_book_use',
      type: 'enum',
      required: false,
      editable: false,
    },
    {
      field: 'material_handling',
      type: 'enum',
      required: false,
      editable: false,
    },
    {
      field: 'cooperation',
      type: 'enum',
      required: false,
      editable: false,
    },
    {
      field: 'school_uniform',
      type: 'enum',
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
  ],
  routes: {
    prefix: 'skills',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-skill',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-skill',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-skill',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-skill',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-skill',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-skill',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-skill',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-skill',
      },
    ],
  },
  roles: ['add-skill', 'edit-skill', 'remove-skill', 'view-skill'],
};
