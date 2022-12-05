import { Repo } from 'app/modules/_shared/repo';
import Conduct from './conduct';

export default class ConductRepo extends Repo<Conduct> {
  constructor() {
    super(Conduct);
  }
}
