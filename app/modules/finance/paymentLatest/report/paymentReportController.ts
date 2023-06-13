import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import FixedStudentPaymentReport from '../fixed/fixedStudentPayment/lib/fixedStudentPaymentReportService';
import RecurrentStudentPaymentReportService from '../recurrent/recurrentStudentPayment/lib/recurrentStudentPaymentReportService';
import RecurrentStudentPaymentService from '../recurrent/recurrentStudentPayment/lib/recurrentStudentPaymentService';
import FixedStudentPaymentService from '../fixed/fixedStudentPayment/lib/fixedStudentPaymentService';
import paymentService from '../lib/payment-service';

export default class PaymentReportController {
  constructor() {}

  async getReport({ request, response }: HttpContextContract) {
    const { start_date, end_date } = request.params();

    const fixed = await FixedStudentPaymentReport.report(start_date, end_date);
    const recurrent = await RecurrentStudentPaymentReportService.report(
      start_date,
      end_date
    );

    response.json({ fixed, recurrent });
  }

  async getStudentPayments({ request, response }: HttpContextContract) {
    const { id } = request.params();

    const recurrent = await RecurrentStudentPaymentService.studentPayments(id);
    const recurrentPending =
      await RecurrentStudentPaymentService.studentPending(id);

    const fixed = await FixedStudentPaymentService.studentPayments(id);
    const fixedPending = await FixedStudentPaymentService.studentPending(id);

    response.json({ fixedPending, recurrentPending, fixed, recurrent });
  }

  async getAttachmentPayments({ request, response }: HttpContextContract) {
    const { start, end } = request.params();

    const payment = await paymentService.getAttachmentReport(start, end);
    const parsed = paymentService.analyzeAttachment(parseInt(start), payment);

    response.json(parsed);
  }
}
