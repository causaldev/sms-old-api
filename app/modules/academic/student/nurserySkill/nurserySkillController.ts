import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import NurserySkill from './nurserySkill';
import NurserySkillService from './nurserySkillService';
import CNurserySkillVal from './cNurserySkillVal';

export default class NurserySkillController extends ApiController<NurserySkill> {
  constructor(protected service = new NurserySkillService()) {
    super(service, {
      createValidator: CNurserySkillVal,
    });
  }

  async studentSkills({ request, response }: HttpContextContract) {
    const { studentId } = request.params();
    const skill = await this.service.fetchStudent(studentId);

    return response.json(skill);
  }
}
