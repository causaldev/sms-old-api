import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import FixedStudentPaymentReport from '../fixed/fixedStudentPayment/lib/fixedStudentPaymentReportService';
import RecurrentStudentPaymentReportService from '../recurrent/recurrentStudentPayment/lib/recurrentStudentPaymentReportService';

export default class PaymentReportController {
  async getReport({ request, response }: HttpContextContract) {
    const { start_date, end_date } = request.params();

    const fixed = await FixedStudentPaymentReport.report(start_date, end_date);
    const recurrent = await RecurrentStudentPaymentReportService.report(
      start_date,
      end_date
    );

    response.json({ fixed, recurrent });
  }
}
