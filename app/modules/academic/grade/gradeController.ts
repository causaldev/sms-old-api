import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import Grade from './grade';
import GradeService from './gradeService';
import CGradeVal from './cGradeVal';
import EGradeVal from './eGradeVal';

export default class GradeController extends ApiController<Grade> {
  constructor(protected service = new GradeService()) {
    super(service, {
      createValidator: CGradeVal,
      editValidator: EGradeVal,
    });
  }

  async gradeWithStudents({ response }: HttpContextContract) {
    const grades = await this.service.getGradeWithStudents();

    response.json({ data: grades });
  }
}
