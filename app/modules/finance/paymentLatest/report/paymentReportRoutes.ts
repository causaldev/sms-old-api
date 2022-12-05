import Route from '@ioc:Adonis/Core/Route';

export default () => {
  Route.group(() => {
    Route.get(
      '/:start_date/:end_date',
      '/app/modules/finance/paymentLatest/report/paymentReportController.getReport'
    );
  })
    .prefix('/reports')
    .middleware('auth:api');
};
