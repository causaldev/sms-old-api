import EvaluationTypeService from 'app/modules/academic/marklist/evaluationType/evaluationTypeService';
import QuarterService from 'app/modules/academic/marklist/quarter/quarterService';
import SemesterService from 'app/modules/academic/marklist/semester/semesterService';
import AcademicYearService from '../../academic/academicYear/academicYearService';
import GradeService from '../../academic/grade/gradeService';

export default class GlobalService {
  constructor(
    protected gradeService = new GradeService(),
    protected academicService = new AcademicYearService(),
    protected evalTypeService = new EvaluationTypeService(),
    protected quarterService = new QuarterService(),
    protected semesterService = new SemesterService()
  ) {}

  async getGlobal() {
    const years = await this.academicService.getYears();
    const activeYear = await this.academicService.active();
    const grades = await this.gradeService.getGrades();
    const evaluationTypes = await this.evalTypeService.findAll();
    const quarters = await this.quarterService.findAll();
    const semesters = await this.semesterService.findAll();

    return {
      version: '0.6.6',
      activeYear,
      years,
      evaluationTypes,
      quarters,
      semesters,
      grades,
    };
  }
}
