import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.get(
      '/student/:studentId',
      '/app/modules/academic/student/conduct/conductController.fetchStudent'
    ).middleware(['can:view-student']);

    Route.post(
      '/',
      '/app/modules/academic/student/conduct/conductController.store'
    ).middleware(['can:add-student']);

    Route.post(
      '/search',
      '/app/modules/academic/student/conduct/conductController.search'
    ).middleware(['can:add-student']);

    Route.get(
      '/',
      '/app/modules/academic/student/conduct/conductController.index'
    ).middleware(['can:view-student']);

    Route.get(
      '/paginate',
      '/app/modules/academic/student/conduct/conductController.paginate'
    ).middleware(['can:view-student']);

    Route.get(
      '/:id',
      '/app/modules/academic/student/conduct/conductController.show'
    ).middleware(['can:view-student']);

    Route.patch(
      '/:id',
      '/app/modules/academic/student/conduct/conductController.update'
    ).middleware(['can:edit-student']);

    Route.delete(
      '/:id',
      '/app/modules/academic/student/conduct/conductController.delete'
    ).middleware(['can:remove-student']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/student/conduct/conductController.showDetail'
    ).middleware(['can:view-student']);
  })
    .prefix('conducts')
    .middleware([getAuthGuard()]);
};
