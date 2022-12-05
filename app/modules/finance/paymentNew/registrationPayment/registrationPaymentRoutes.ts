import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/finance/paymentNew/registrationPayment/registrationPaymentController.store'
    ).middleware(['can:add-registration']);

    Route.get(
      '/non-registered/:gradeId',
      '/app/modules/finance/paymentNew/registrationPayment/registrationPaymentController.nonRegistered'
    ).middleware(['can:view-registration']);

    Route.get(
      '/registered/:gradeId',
      '/app/modules/finance/paymentNew/registrationPayment/registrationPaymentController.registered'
    ).middleware(['can:view-registration']);

    Route.post(
      '/search',
      '/app/modules/finance/paymentNew/registrationPayment/registrationPaymentController.search'
    ).middleware(['can:add-registration']);

    Route.get(
      '/',
      '/app/modules/finance/paymentNew/registrationPayment/registrationPaymentController.index'
    ).middleware(['can:view-registration']);

    Route.get(
      '/paginate',
      '/app/modules/finance/paymentNew/registrationPayment/registrationPaymentController.paginate'
    ).middleware(['can:view-registration']);

    Route.get(
      '/:id',
      '/app/modules/finance/paymentNew/registrationPayment/registrationPaymentController.show'
    ).middleware(['can:view-registration']);

    Route.patch(
      '/:id',
      '/app/modules/finance/paymentNew/registrationPayment/registrationPaymentController.update'
    ).middleware(['can:edit-registration']);

    Route.delete(
      '/:id',
      '/app/modules/finance/paymentNew/registrationPayment/registrationPaymentController.delete'
    ).middleware(['can:remove-registration']);

    Route.post(
      '/show/:id',
      '/app/modules/finance/paymentNew/registrationPayment/registrationPaymentController.showDetail'
    ).middleware(['can:view-registration']);
  })
    .prefix('registration-payments')
    .middleware([getAuthGuard()]);
};
