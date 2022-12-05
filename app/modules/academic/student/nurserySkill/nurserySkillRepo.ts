import { Repo } from 'app/modules/_shared/repo';
import NurserySkill from './nurserySkill';

export default class NurserySkillRepo extends Repo<NurserySkill> {
  constructor() {
    super(NurserySkill);
  }
}
