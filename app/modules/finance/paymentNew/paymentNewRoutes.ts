import Route from '@ioc:Adonis/Core/Route';
import feePaymentRoutes from './feePayment/feePaymentRoutes';
import registrationPaymentRoutes from './registrationPayment/registrationPaymentRoutes';

export default () =>
  Route.group(() => {
    feePaymentRoutes();
    registrationPaymentRoutes();
  }).prefix('finance/payment-new');
