import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.get(
      '/:student_id/non-paid-months',
      '/app/modules/finance/paymentNew/feePayment/feePaymentController.nonPaid'
    ).middleware(['can:view-fee']);

    Route.post(
      '/',
      '/app/modules/finance/paymentNew/feePayment/feePaymentController.store'
    ).middleware(['can:add-fee']);

    Route.post(
      '/search',
      '/app/modules/finance/paymentNew/feePayment/feePaymentController.search'
    ).middleware(['can:add-fee']);

    Route.get(
      '/',
      '/app/modules/finance/paymentNew/feePayment/feePaymentController.index'
    ).middleware(['can:view-fee']);

    Route.get(
      '/paginate',
      '/app/modules/finance/paymentNew/feePayment/feePaymentController.paginate'
    ).middleware(['can:view-fee']);

    Route.get(
      '/:id',
      '/app/modules/finance/paymentNew/feePayment/feePaymentController.show'
    ).middleware(['can:view-fee']);

    Route.patch(
      '/:id',
      '/app/modules/finance/paymentNew/feePayment/feePaymentController.update'
    ).middleware(['can:edit-fee']);

    Route.delete(
      '/:id',
      '/app/modules/finance/paymentNew/feePayment/feePaymentController.delete'
    ).middleware(['can:remove-fee']);

    Route.post(
      '/show/:id',
      '/app/modules/finance/paymentNew/feePayment/feePaymentController.showDetail'
    ).middleware(['can:view-fee']);
  })
    .prefix('fee-payments')
    .middleware([getAuthGuard()]);
};
