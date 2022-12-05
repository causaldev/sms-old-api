import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import GlobalService from './globalService';

export default class GlobalController {
  constructor(protected globalService = new GlobalService()) {}

  async getGlobal({ response }: HttpContextContract) {
    const data = await this.globalService.getGlobal();

    return response.json(data);
  }
}
