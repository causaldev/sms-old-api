import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.store'
    ).middleware([]);

    Route.patch(
      '/:id',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.edit'
    ).middleware([]);

    Route.delete(
      '/:id',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.delete'
    ).middleware([]);

    Route.post(
      '/pending',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.storePending'
    ).middleware([]);

    Route.post(
      '/student-payment',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.storePayment'
    ).middleware([]);

    Route.get(
      '/student-payment/:recurrentPaymentId/search',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.searchPayment'
    ).middleware([]);

    Route.get(
      '/active',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.getActive'
    ).middleware([]);

    Route.get(
      '/archived',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.getArchived'
    ).middleware([]);

    Route.get(
      '/:id',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.show'
    ).middleware([]);

    /**
     * Recurrent child routes
     */
    Route.patch(
      '/child/:id',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.editRecurrentChild'
    ).middleware([]);

    Route.delete(
      '/child/:id',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.deleteRecurrentChild'
    ).middleware([]);

    Route.post(
      '/child/penalty/:id',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.getChildPenalty'
    ).middleware([]);

    /**
     * Recurrent pending routes
     */
    Route.get(
      '/pending/recurrent-child/:id',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.getPendingByChild'
    ).middleware([]);

    Route.post(
      '/pending/add-student',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.addStudent'
    ).middleware([]);

    Route.delete(
      '/pending/:id',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.deleteRecurrentPending'
    ).middleware([]);
  })
    .prefix('recurrent')
    .middleware(getAuthGuard());
};
