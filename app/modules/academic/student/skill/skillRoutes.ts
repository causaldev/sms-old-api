import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.get(
      '/student/:studentId',
      '/app/modules/academic/student/skill/skillController.studentSkills'
    ).middleware(['can:view-student']);

    Route.post(
      '/',
      '/app/modules/academic/student/skill/skillController.store'
    ).middleware(['can:add-student']);

    Route.post(
      '/search',
      '/app/modules/academic/student/skill/skillController.search'
    ).middleware(['can:add-student']);

    Route.get(
      '/',
      '/app/modules/academic/student/skill/skillController.index'
    ).middleware(['can:view-student']);

    Route.get(
      '/paginate',
      '/app/modules/academic/student/skill/skillController.paginate'
    ).middleware(['can:view-student']);

    Route.get(
      '/:id',
      '/app/modules/academic/student/skill/skillController.show'
    ).middleware(['can:view-student']);

    Route.delete(
      '/:id',
      '/app/modules/academic/student/skill/skillController.delete'
    ).middleware(['can:remove-student']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/student/skill/skillController.showDetail'
    ).middleware(['can:view-student']);
  })
    .prefix('skills')
    .middleware([getAuthGuard()]);
};
