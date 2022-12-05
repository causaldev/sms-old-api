import NurserySkill from 'app/modules/academic/student/nurserySkill/nurserySkill';
import test from 'japa';
import { NurserySkillFactory } from './nurserySkillFactory';
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

const apiUrl = '/academic/skills';
const roles = ['add-student', 'edit-student', 'remove-student', 'view-student'];

const factory = NurserySkillFactory;
// .with('gradeStudent').with('quarter');

transact('NurserySkill show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: NurserySkill,
    });
  });
});

transact('NurserySkill paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: NurserySkill,
    });
  });
});

transact('NurserySkill index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: NurserySkill,
    });
  });
});

transact('NurserySkill create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      grade_student_id: 'required validation failed',
      quarter_id: 'required validation failed',
    })
  );
  test('store', async () => {
    const data = await factory.create();
    await data.delete();

    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data.serialize() },
      model: NurserySkill,
      assertionData: {},
    });
  });
});

transact('NurserySkill update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        grade_student_id: 'string validation failed',
        quarter_id: 'string validation failed',
      },
      { grade_student_id: 100, quarter_id: 100 },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await NurserySkill.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (await NurserySkill.findOrFail(updateF.id)).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: NurserySkill,
      item,
      updateData,
      updateFields: ['grade_student_id', 'quarter_id'],
      assertionData: {},
    });
  });
});

transact('NurserySkill delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: NurserySkill,
      itemId: items[0].id,
    });
  });
});
