import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.get(
      '/non-sent',
      '/app/modules/textMessages/textMessageController.getNonSent'
    ).middleware([]);
  })
    .prefix('/text-messages')
    .middleware([getAuthGuard()]);
};
