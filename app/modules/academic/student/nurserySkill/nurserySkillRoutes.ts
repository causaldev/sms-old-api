import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.get(
      '/student/:studentId',
      '/app/modules/academic/student/nurserySkill/nurserySkillController.studentSkills'
    ).middleware(['can:view-student']);

    Route.post(
      '/',
      '/app/modules/academic/student/nurserySkill/nurserySkillController.store'
    ).middleware(['can:add-student']);

    Route.post(
      '/search',
      '/app/modules/academic/student/nurserySkill/nurserySkillController.search'
    ).middleware(['can:add-student']);

    Route.get(
      '/',
      '/app/modules/academic/student/nurserySkill/nurserySkillController.index'
    ).middleware(['can:view-student']);

    Route.get(
      '/paginate',
      '/app/modules/academic/student/nurserySkill/nurserySkillController.paginate'
    ).middleware(['can:view-student']);

    Route.get(
      '/:id',
      '/app/modules/academic/student/nurserySkill/nurserySkillController.show'
    ).middleware(['can:view-student']);

    Route.patch(
      '/:id',
      '/app/modules/academic/student/nurserySkill/nurserySkillController.update'
    ).middleware(['can:edit-student']);

    Route.delete(
      '/:id',
      '/app/modules/academic/student/nurserySkill/nurserySkillController.delete'
    ).middleware(['can:remove-student']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/student/nurserySkill/nurserySkillController.showDetail'
    ).middleware(['can:view-student']);
  })
    .prefix('nursery-skills')
    .middleware([getAuthGuard()]);
};
