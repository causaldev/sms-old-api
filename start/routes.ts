import Route from '@ioc:Adonis/Core/Route';
import academicRoutes from 'app/modules/academic/academicRoutes';
import authRoutes from 'app/modules/auth/authRoutes';
import paymentRoutes from 'app/modules/finance/payment/paymentRoutes';
import paymentLatestRoute from 'app/modules/finance/paymentLatest/paymentLatestRoute';
import paymentNewRoutes from 'app/modules/finance/paymentNew/paymentNewRoutes';
import hrRoutes from 'app/modules/hr/hrRoutes';
import userRoutes from 'app/modules/user/userRoutes';
import { getAuthGuard } from 'app/services/utils';

Route.group(() => {
  academicRoutes();

  authRoutes();

  paymentRoutes();

  paymentNewRoutes();

  paymentLatestRoute();

  hrRoutes();

  userRoutes();

  Route.get(
    'global',
    '/app/modules/_shared/global/globalController.getGlobal'
  ).middleware(getAuthGuard());

  Route.any('/test', '/app/modules/testController.test').middleware([
    // getAuthGuard(),
  ]);
  Route.any('/test2/:id', '/app/modules/testController.test2');

  // Route.get('/auth', async ({ auth }: HttpContextContract) => {
  //   return auth.user?.id || 'Not Auth';
  // });
})
  .prefix('/api')
  .middleware('lastOp');

Route.get('/img', '/app/core/imageController.image');

Route.get('/version', () => {
  return { version: '0.6.7' };
});
