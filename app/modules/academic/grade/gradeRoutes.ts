import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/academic/grade/gradeController.store'
    ).middleware([getAuthGuard(), 'can:add-grade']);

    Route.post(
      '/search',
      '/app/modules/academic/grade/gradeController.search'
    ).middleware([getAuthGuard(), 'can:view-grade']);

    Route.get(
      '/with-students',
      '/app/modules/academic/grade/gradeController.gradeWithStudents'
    ).middleware([getAuthGuard(), 'can:view-grade']);

    Route.get(
      '/',
      '/app/modules/academic/grade/gradeController.index'
    ).middleware([getAuthGuard(), 'can:view-grade']);

    Route.get(
      '/paginate',
      '/app/modules/academic/grade/gradeController.paginate'
    ).middleware([getAuthGuard(), 'can:view-grade']);

    Route.get('/:id', '/app/modules/academic/grade/gradeController.show')
      .middleware([getAuthGuard(), 'can:view-grade'])
      .middleware([getAuthGuard(), 'can:view-grade']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/grade/gradeController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-grade']);

    Route.patch(
      '/:id',
      '/app/modules/academic/grade/gradeController.update'
    ).middleware([getAuthGuard(), 'can:edit-grade']);

    Route.delete(
      '/:id',
      '/app/modules/academic/grade/gradeController.delete'
    ).middleware([getAuthGuard(), 'can:remove-grade']);
  }).prefix('grades');
};
