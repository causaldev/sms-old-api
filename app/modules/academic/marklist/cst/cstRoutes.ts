import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.get(
      '/grade/:gradeId',
      '/app/modules/academic/marklist/cst/cstController.getGrade'
    ).middleware([getAuthGuard()]);

    Route.get(
      '/:cstId/quarter/:quarterId',
      '/app/modules/academic/marklist/cst/cstController.getQuarter'
    ).middleware([getAuthGuard()]);

    Route.post(
      '/',
      '/app/modules/academic/marklist/cst/cstController.store'
    ).middleware([getAuthGuard(), 'can:add-cst']);

    Route.post(
      '/search',
      '/app/modules/academic/marklist/cst/cstController.search'
    ).middleware([getAuthGuard(), 'can:view-cst']);

    Route.get(
      '/',
      '/app/modules/academic/marklist/cst/cstController.index'
    ).middleware([getAuthGuard(), 'can:view-cst']);

    Route.get(
      '/paginate',
      '/app/modules/academic/marklist/cst/cstController.paginate'
    ).middleware([getAuthGuard(), 'can:view-cst']);

    Route.get(
      '/:id',
      '/app/modules/academic/marklist/cst/cstController.show'
    ).middleware([getAuthGuard(), 'can:view-cst']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/marklist/cst/cstController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-cst']);

    Route.patch(
      '/:id',
      '/app/modules/academic/marklist/cst/cstController.update'
    ).middleware([getAuthGuard(), 'can:edit-cst']);

    // TODO: Fix
    Route.delete(
      '/:id',
      '/app/modules/academic/marklist/cst/cstController.delete'
    ).middleware([
      getAuthGuard(),
      // 'can:remove-cst'
    ]);
  }).prefix('csts');
};
