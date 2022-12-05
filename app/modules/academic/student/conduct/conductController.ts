import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import Conduct from './conduct';
import ConductService from './conductService';
import CConductVal from './cConductVal';

export default class ConductController extends ApiController<Conduct> {
  constructor(protected service = new ConductService()) {
    super(service, {
      createValidator: CConductVal,
    });
  }

  async fetchStudent({ request, response }: HttpContextContract) {
    const { studentId } = request.params();

    const conduct = await this.service.fetchStudentConduct(studentId);

    return response.json(conduct);
  }
}
