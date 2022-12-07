import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';
import conductRoutes from './conduct/conductRoutes';
import nurserySkillRoutes from './nurserySkill/nurserySkillRoutes';
import skillRoutes from './skill/skillRoutes';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/academic/student/studentController.store'
    ).middleware([getAuthGuard(), 'can:add-student']);

    Route.post(
      '/search',
      '/app/modules/academic/student/studentController.search'
    ).middleware([getAuthGuard(), 'can:view-student']);

    Route.get(
      '/',
      '/app/modules/academic/student/studentController.index'
    ).middleware([getAuthGuard(), 'can:view-student']);

    Route.get(
      '/paginate',
      '/app/modules/academic/student/studentController.paginate'
    ).middleware([getAuthGuard(), 'can:view-student']);

    Route.get(
      '/:id',
      '/app/modules/academic/student/studentController.show'
    ).middleware([
      getAuthGuard(),
      // 'can:view-student'
    ]);

    Route.post(
      '/show/:id',
      '/app/modules/academic/student/studentController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-student']);

    Route.patch(
      '/:id',
      '/app/modules/academic/student/studentController.update'
    ).middleware([getAuthGuard(), 'can:edit-student']);

    Route.delete(
      '/:id',
      '/app/modules/academic/student/studentController.delete'
    ).middleware([getAuthGuard(), 'can:remove-student']);

    conductRoutes();
    nurserySkillRoutes();
    skillRoutes();
  }).prefix('students');
};
