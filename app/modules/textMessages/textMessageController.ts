import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { TextMessageService } from './textMessageService';

export default class TextMessageController {
  async index({ request, response }: HttpContextContract) {
    const { parent_id, mark_sent, non_sent } = request.qs();
    const result = await TextMessageService.getMessages(
      non_sent,
      parent_id,
      mark_sent
    );

    response.status(201).json(result);
  }

  async create({ request, response }: HttpContextContract) {
    const result = await TextMessageService.create(request);

    response.status(201).json(result);
  }
}
