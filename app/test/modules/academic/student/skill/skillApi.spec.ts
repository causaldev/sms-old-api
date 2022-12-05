import Skill from 'app/modules/academic/student/skill/skill';
import test from 'japa';
import { SkillFactory } from './skillFactory';
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
const roles = ['add-skill', 'edit-skill', 'remove-skill', 'view-skill'];

const factory = SkillFactory.with('gradeStudent');

transact('Skill show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Skill,
    });
  });
});

transact('Skill paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Skill,
    });
  });
});

transact('Skill index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Skill,
    });
  });
});

transact('Skill create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      grade_student_id: 'required validation failed',
    })
  );
  test('store', async () => {
    const data = await factory.create();
    await data.delete();

    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data.serialize() },
      model: Skill,
      assertionData: {},
    });
  });
});

transact('Skill update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        grade_student_id: 'string validation failed',
      },
      { grade_student_id: 100 },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await Skill.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (await Skill.findOrFail(updateF.id)).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: Skill,
      item,
      updateData,
      updateFields: ['grade_student_id'],
      assertionData: {},
    });
  });
});

transact('Skill delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: Skill,
      itemId: items[0].id,
    });
  });
});
