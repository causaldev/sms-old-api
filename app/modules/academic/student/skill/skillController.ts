import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import Skill from './skill';
import SkillService from './skillService';
import CSkillVal from './cSkillVal';

export default class SkillController extends ApiController<Skill> {
  constructor(protected service = new SkillService()) {
    super(service, {
      createValidator: CSkillVal,
    });
  }

  async studentSkills({ request, response }: HttpContextContract) {
    const { studentId } = request.params();
    const skill = await this.service.fetchStudent(studentId);

    return response.json(skill);
  }
}
