import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import FixedPaymentPendingService from './fixedPaymentPending/lib/fixedPaymentPendingService';
import FixedStudentPaymentSearchService from './fixedStudentPayment/lib/fixedStudentPaymentSearchService';
import FixedStudentPaymentService from './fixedStudentPayment/lib/fixedStudentPaymentService';
import FixedPaymentService from './lib/fixedPaymentService';
import { FixedPaymentCreateVal } from './lib/fixedPaymentVal';

export default class FixedPaymentController {
  async create({ request, response }: HttpContextContract) {
    const filteredData = await request.validate(FixedPaymentCreateVal);
    const result = await FixedPaymentService.createFixed(filteredData);

    response.status(201).json(result);
  }

  async edit({ request, response }: HttpContextContract) {
    const { id } = request.params();

    const result = await FixedPaymentService.editFixed(id, request);

    response.status(200).json(result);
  }

  async fetchActiveFixed({ response }: HttpContextContract) {
    const data = await FixedPaymentService.fetchActive();

    response.json(data);
  }

  async fixedWithPending({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const data = await FixedPaymentService.fixedWithPending(id);

    response.json(data);
  }

  async fetchArchivedFixed({ response }: HttpContextContract) {
    const data = await FixedPaymentService.fetchArchived();

    response.json({ data });
  }

  async show({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const payment = await FixedPaymentService.findOne(id);

    response.json(payment);
  }

  async delete({ request, response }: HttpContextContract) {
    const { id } = request.params();
    await FixedPaymentService.delete(id);

    response.json({ data: true });
  }

  async getPenalty({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const { slipDate } = request.body();

    const penalty = await FixedPaymentService.getPenalty(id, slipDate);

    response.json({ data: penalty });
  }

  /** Pending routes */
  async deletePending({ request, response }: HttpContextContract) {
    const { id } = request.params();
    await FixedPaymentPendingService.delete(id);

    response.json({ data: true });
  }

  async createPending({ request, response }: HttpContextContract) {
    await FixedPaymentPendingService.createPending(request);

    response.status(201).json({ data: true });
  }

  async assignStudentPending({ request, response }: HttpContextContract) {
    const result = await FixedPaymentPendingService.assignPending(request);

    response.json({ data: result });
  }

  /** Student payment */
  async createStudentPayment({ request, response, auth }: HttpContextContract) {
    await FixedStudentPaymentService.createPayment(request, auth.user!.id);

    response.status(201).json({ data: true });
  }

  async searchPayment({ request, response }: HttpContextContract) {
    const { fixedPaymentId } = request.params();
    const result = await FixedStudentPaymentSearchService.search(
      fixedPaymentId,
      request.qs()
    );

    response.json(result);
  }
}
