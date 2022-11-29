import { Repo } from 'app/modules/_shared/repo';
import EvaluationType from './evaluationType';

export default class EvaluationTypeRepo extends Repo<EvaluationType> {
  constructor() {
    super(EvaluationType);
  }

  async findAll() {
    return (await EvaluationType.query().orderBy(
      'name',
      'asc'
    )) as EvaluationType[];
  }

  async totals100(evalTypeIds: string[]) {
    const query = (await this.model
      .query()
      .whereIn('id', evalTypeIds)) as EvaluationType[];
    const total = query.map((a) => a.weight).reduce((a, b) => a + b);

    return total === 100;
  }
}
