import { Repo } from 'app/modules/_shared/repo';
import Skill from './skill';

export default class SkillRepo extends Repo<Skill> {
  constructor() {
    super(Skill);
  }
}
