import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import Cst from './cst';
import CstService from './cstService';
import CCstVal from './cCstVal';
import ECstVal from './eCstVal';
import GradeStudentService from '../../gradeStudent/gradeStudentService';
import QuarterService from '../quarter/quarterService';

export default class CstController extends ApiController<Cst> {
  constructor(
    protected service = new CstService(),
    protected gradeStudentService = new GradeStudentService(),
    protected quarterService = new QuarterService()
  ) {
    super(service, {
      createValidator: CCstVal,
      editValidator: ECstVal,
    });
  }

  async getGrade({ request, response }: HttpContextContract) {
    const { gradeId } = request.params();
    const data = await this.service.getGradeCST(gradeId);

    return response.json(data);
  }

  async getQuarter({ request, response }: HttpContextContract) {
    const { cstId, quarterId } = request.params();

    const quarter = await this.quarterService.findOne(quarterId);
    const cst = await this.service.getQuarterCst(cstId, quarterId);
    const students =
      await this.gradeStudentService.currentRegisteredActiveStudents(
        cst.grade_id
      );

    return response.json({ students, quarter, cst });
  }
}
