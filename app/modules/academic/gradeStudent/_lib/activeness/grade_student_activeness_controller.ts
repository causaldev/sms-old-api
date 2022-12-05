import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import GsActivenessService from './_lib/gs_activeness_service';

export default class GradeStudentActivenessController {
  async store({ request, response }: HttpContextContract) {
    await GsActivenessService.create(request);

    response.json({ data: true });
  }
}
