import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/academic/marklist/sml/smlController.store'
    ).middleware([getAuthGuard()]);

    Route.post(
      '/search',
      '/app/modules/academic/marklist/sml/smlController.search'
    ).middleware([getAuthGuard(), 'can:add-sml']);

    Route.get(
      '/',
      '/app/modules/academic/marklist/sml/smlController.index'
    ).middleware([getAuthGuard(), 'can:view-sml']);

    Route.get(
      '/paginate',
      '/app/modules/academic/marklist/sml/smlController.paginate'
    ).middleware([getAuthGuard(), 'can:view-sml']);

    Route.get(
      '/:id',
      '/app/modules/academic/marklist/sml/smlController.show'
    ).middleware([getAuthGuard(), 'can:view-sml']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/marklist/sml/smlController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-sml']);

    Route.patch(
      '/:id',
      '/app/modules/academic/marklist/sml/smlController.update'
    ).middleware([getAuthGuard(), 'can:edit-sml']);

    Route.delete(
      '/:id',
      '/app/modules/academic/marklist/sml/smlController.delete'
    ).middleware([getAuthGuard(), 'can:remove-sml']);
  }).prefix('smls');
};
