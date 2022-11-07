import Service from 'app/modules/_shared/service';
import AcademicYear from './academicYear';
import AcademicYearRepo from './academicYearRepo';

export default class AcademicYearService extends Service<AcademicYear> {
  constructor() {
    super(new AcademicYearRepo());
  }

  async getYears() {
    return (await this.getRepo()
      .model.query()
      .orderBy('year', 'asc')) as AcademicYear[];
  }

  async active() {
    return (await this.getRepo()
      .model.query()
      .where('active', true)
      .first()) as AcademicYear | null;
  }

  async create(createData: Partial<AcademicYear>) {
    return super.create({ ...createData, active: false });
  }

  static async getActive() {
    return (await AcademicYear.getActiveYear()) as AcademicYear;
  }

  async setActive(id: string) {
    return (this.repo as AcademicYearRepo).setActive(id);
  }
}
