import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import RegistrationPayment from './registrationPayment';
import RegistrationPaymentService from './registrationPaymentService';
import CRegistrationPaymentVal from './cRegistrationPaymentVal';
import ERegistrationPaymentVal from './eRegistrationPaymentVal';

export default class RegistrationPaymentController extends ApiController<RegistrationPayment> {
  constructor(protected service = new RegistrationPaymentService()) {
    super(service, {
      createValidator: CRegistrationPaymentVal,
      editValidator: ERegistrationPaymentVal,
    });
  }

  async nonRegistered({ response, request }: HttpContextContract) {
    const { gradeId } = request.params();
    const students = await this.service.listNonRegisteredByGrade(gradeId);

    return response.json({ data: students });
  }

  async registered({ response, request }: HttpContextContract) {
    const { gradeId } = request.params();
    const students = await this.service.listRegisteredGrade(gradeId);

    return response.json({ data: students });
  }
}
