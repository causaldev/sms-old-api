import Route from '@ioc:Adonis/Core/Route';

export default () => {
  Route.group(() => {
    Route.get(
      '/student-payments/:id',
      '/app/modules/finance/paymentLatest/report/paymentReportController.getStudentPayments'
    ).prefix('/reports');
  });

  Route.group(() => {
    Route.get(
      '/attachment-payments/:start/:end',
      '/app/modules/finance/paymentLatest/report/paymentReportController.getAttachmentPayments'
    ).prefix('/reports');
  });

  Route.group(() => {
    Route.get(
      '/:start_date/:end_date',
      '/app/modules/finance/paymentLatest/report/paymentReportController.getReport'
    );
  })
    .prefix('/reports')
    .middleware('auth:api');
};
