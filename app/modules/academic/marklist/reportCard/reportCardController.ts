import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import AcademicYear from '../../academicYear/academicYear';
import Grade from '../../grade/grade';
// import Grade from '../../grade/grade';
import Quarter from '../quarter/quarter';
import Semester from '../semester/semester';
import Rc from './rc';
import RcqService from './rcq/rcqService';
import RcsService from './rcs/rcsService';
import RcyService from './rcy/rcyService';
import ReportCardRepo from './reportCardRepo';
import ReportCardService from './reportCardService';
import ReportPdfService from './reportPdfService';

export default class ReportCardController extends ApiController<Rc> {
  constructor(protected service = new ReportCardService(new ReportCardRepo())) {
    super(service, {});
  }

  async fetchReportGrades({ response, request }: HttpContextContract) {
    const { yearId } = request.params();
    const grades = await this.service.fetchGradeWithSubject(yearId);

    response.json({ grades });
  }

  async fetchReport({ request, response }: HttpContextContract) {
    const { gradeId, yearId } = request.params();
    const report = await this.service.fetchReport(gradeId, yearId);

    response.json({ report });
  }

  async generatePdf({ request, response }: HttpContextContract) {
    const { gradeId } = request.params();
    const htmlPath = await new ReportPdfService().generateReportPdf(gradeId);
    console.log(htmlPath);

    await Grade.findOrFail(gradeId);

    return response.download(htmlPath);
    // return response.stream(require('fs').createReadStream(htmlPath));
    // return response.attachment(pdfPath as string);
  }

  async generateStudentPdf({ request, response }: HttpContextContract) {
    const { gsId } = request.params();
    const pdfPath = await new ReportPdfService().generateStudentReportPdf(gsId);

    return response.download(pdfPath);
    // return response.stream(require('fs').createReadStream(pdfPath));
    // return response.attachment(pdfPath as string);
  }

  // TODO: Refactor
  async generateAll({ request, response }: HttpContextContract) {
    const { gradeId } = request.params();
    const quarters = await Quarter.all();
    for (let i = 0; i < quarters.length; i++) {
      console.log(`Gen Quarter ${i + 1}`);
      await new RcqService().generateGradeReport(gradeId, quarters[i].id);
      await new RcqService().updateRank(gradeId, quarters[i].id);
    }

    const semesters = await Semester.all();
    for (let i = 0; i < semesters.length; i++) {
      console.log(`Gen Semester ${i + 1}`);
      await new RcsService().generateGradeReport(gradeId, semesters[i].id);
      await new RcsService().updateRank(gradeId, semesters[i].id);
    }

    console.log(`Gen Year`);
    const year = await AcademicYear.getActiveYear();
    await new RcyService().generateReportGrade(gradeId, year.id);
    await new RcyService().updateRank(gradeId, year.id);

    return response.json({ data: true });
  }

  async generateRoster({ request, response }: HttpContextContract) {
    const { gradeId } = request.params();
    const data = await this.service.generateRoster(gradeId);

    return response.json({ data });
  }
}
