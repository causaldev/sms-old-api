import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { TextMessageService } from './textMessageService';

export default class TextMessageController {
  async getNonSent({ request, response }: HttpContextContract) {
    const result = await TextMessageService.getNonSent(request.qs().parentId);

    response.status(201).json(result);
  }
}
