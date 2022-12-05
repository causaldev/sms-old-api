import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import RecurrentPaymentService from './lib/recurrentPaymentService';
import RecurrentPaymentChildService from './recurrentPaymentChild/_lib/recurrentPaymentChildService';
import RecurrentPaymentPendingService from './recurrentPaymentPending/lib/recurrentPaymentPendingService';
import RecurrentStudentPaymentSearchService from './recurrentStudentPayment/lib/recurrentStudentPaymentSearchService';
import RecurrentStudentPaymentService from './recurrentStudentPayment/lib/recurrentStudentPaymentService';

export default class RecurrentPaymentController {
  async store({ request, response }: HttpContextContract) {
    const recurrentId = await RecurrentPaymentService.createRecurrent(request);

    response.json({ recurrentId });
  }

  async edit({ request, response }: HttpContextContract) {
    const result = await RecurrentPaymentService.edit(request);

    response.json({ data: result });
  }

  async delete({ request, response }: HttpContextContract) {
    const { id } = request.params();
    await RecurrentPaymentService.delete(id);

    response.json({ data: true });
  }

  async storePending({ request, response }: HttpContextContract) {
    await RecurrentPaymentPendingService.createPending(request);

    response.json({ data: true });
  }

  async show({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const data = await RecurrentPaymentService.findOne(id);

    response.json(data);
  }

  async getActive({ response }: HttpContextContract) {
    const data = await RecurrentPaymentService.findActive();

    response.json(data);
  }

  async getArchived({ response }: HttpContextContract) {
    const data = await RecurrentPaymentService.findArchived();

    response.json(data);
  }

  /** Recurrent child functions */
  async editRecurrentChild({ request, response }: HttpContextContract) {
    const result = await RecurrentPaymentChildService.edit(request);

    response.json(result);
  }

  async deleteRecurrentChild({ request, response }: HttpContextContract) {
    const { id } = request.params();
    await RecurrentPaymentChildService.delete(id);

    response.json({ data: true });
  }

  async getChildPenalty({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const { slipDate } = request.body();

    const penalty = await RecurrentPaymentChildService.getPenalty(id, slipDate);

    response.json({ data: penalty });
  }

  /** Pending functions */
  async getPendingByChild({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const data = await RecurrentPaymentPendingService.findByPaymentChild(id);

    response.json(data);
  }

  async deleteRecurrentPending({ request, response }: HttpContextContract) {
    const { id } = request.params();
    await RecurrentPaymentPendingService.delete(id);

    response.json({ data: true });
  }

  async addStudent({ request, response }: HttpContextContract) {
    await RecurrentPaymentPendingService.addStudent(request);

    response.json({ data: true });
  }

  /** Recurrent student payment functions */
  async storePayment({ request, response, auth }: HttpContextContract) {
    await RecurrentStudentPaymentService.createPayment(request, auth.user!.id);

    response.json({ data: true });
  }

  async searchPayment({ request, response }: HttpContextContract) {
    const { recurrentPaymentId } = request.params();
    const result = await RecurrentStudentPaymentSearchService.search(
      recurrentPaymentId,
      request.qs()
    );

    response.json(result);
  }
}
