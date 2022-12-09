import Service from 'app/modules/_shared/service';
import { quarterMap } from 'app/modules/_shared/types';
import RcqCst from './rcqCst';
import RcqCstRepo from './rcqCstRepo';

export default class RcqCstService extends Service<RcqCst> {
  constructor() {
    super(new RcqCstRepo());
  }

  async fetchFormattedData(gradeStudentId: string) {
    const data = await (this.repo as RcqCstRepo).fetchStudentMarks(
      gradeStudentId
    );
    if (gradeStudentId === 'aefc2150-54fe-4ed0-8681-7c8fd2202a78') {
      // require('fs').writeFileSync(
      //   `${__dirname}/sub.json`,
      //   JSON.stringify(data, null, 2)
      // );
      // console.log(JSON.stringify(data, null, 2));
    }
    return this.formatStudentData(data);
  }

  formatStudentData(data: any[]) {
    const mappedData = {};
    data.forEach((item) => {
      const { subject } = item.cst.subject;
      const { quarter } = item.rcq.quarter;

      if (mappedData[subject] === undefined) {
        mappedData[subject] = {};
      }

      mappedData[subject][quarterMap[quarter]] = item.score;
    });

    return mappedData;
  }
}
