import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/textMessages/textMessageController.create'
    ).middleware([]);

    Route.get(
      '/',
      '/app/modules/textMessages/textMessageController.index'
    ).middleware([]);
  })
    .prefix('/text-messages')
    .middleware([getAuthGuard()]);
};
