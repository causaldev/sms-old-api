import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.get(
      '/student-payment/:fixedPaymentId/search',
      '/app/modules/finance/paymentLatest/fixed/fixedPaymentController.searchPayment'
    ).middleware([]);

    Route.post(
      '/',
      '/app/modules/finance/paymentLatest/fixed/fixedPaymentController.create'
    ).middleware([]);

    Route.patch(
      '/:id',
      '/app/modules/finance/paymentLatest/fixed/fixedPaymentController.edit'
    ).middleware([]);

    Route.delete(
      '/:id',
      '/app/modules/finance/paymentLatest/fixed/fixedPaymentController.delete'
    ).middleware([]);

    Route.post(
      '/penalty/:id',
      '/app/modules/finance/paymentLatest/fixed/fixedPaymentController.getPenalty'
    ).middleware([]);

    Route.post(
      '/pending',
      '/app/modules/finance/paymentLatest/fixed/fixedPaymentController.createPending'
    ).middleware([]);

    Route.post(
      '/pending/assign-student',
      '/app/modules/finance/paymentLatest/fixed/fixedPaymentController.assignStudentPending'
    ).middleware([]);

    Route.delete(
      '/pending/:id',
      '/app/modules/finance/paymentLatest/fixed/fixedPaymentController.deletePending'
    ).middleware([]);

    Route.post(
      '/student-payment',
      '/app/modules/finance/paymentLatest/fixed/fixedPaymentController.createStudentPayment'
    ).middleware([]);

    Route.get(
      '/active',
      '/app/modules/finance/paymentLatest/fixed/fixedPaymentController.fetchActiveFixed'
    ).middleware([]);

    Route.get(
      '/archived',
      '/app/modules/finance/paymentLatest/fixed/fixedPaymentController.fetchArchivedFixed'
    ).middleware([]);

    Route.get(
      '/with-pending/:id',
      '/app/modules/finance/paymentLatest/fixed/fixedPaymentController.fixedWithPending'
    ).middleware([]);

    Route.get(
      '/:id',
      '/app/modules/finance/paymentLatest/fixed/fixedPaymentController.show'
    ).middleware([]);
  })
    .prefix('fixed')
    .middleware([getAuthGuard()]);
};
