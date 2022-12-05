import Route from '@ioc:Adonis/Core/Route';
import fixedPaymentRoute from './fixed/fixedPaymentRoute';
import recurrentPaymentRoutes from './recurrent/recurrentPaymentRoutes';
import paymentReportRoutes from './report/paymentReportRoutes';

export default () => {
  Route.group(() => {
    fixedPaymentRoute();
    recurrentPaymentRoutes();
    paymentReportRoutes();
  }).prefix('payment-latest');
};
