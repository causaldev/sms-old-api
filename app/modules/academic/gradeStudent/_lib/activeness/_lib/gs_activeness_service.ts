import { RequestContract } from '@ioc:Adonis/Core/Request';
import GradeStudentService from 'app/modules/academic/gradeStudent/gradeStudentService';
import FixedStudentPaymentService from 'app/modules/finance/paymentLatest/fixed/fixedStudentPayment/lib/fixedStudentPaymentService';
import GradeStudentFixedActiveness from '../grade_student_activeness';
import { CreateGsActivenessVal } from './gs_activeness_val';

const GsActivenessService = {
  findOneNullable: (
    fixedPaymentId: string,
    gradeId: string,
    yearId: string
  ) => {
    return GradeStudentFixedActiveness.query()
      .where('academic_year_id', yearId)
      .where('grade_id', gradeId)
      .where('fixed_payment_id', fixedPaymentId)
      .first();
  },

  create: async (request: RequestContract) => {
    const { grade_ids, academic_year_id, fixed_payment_id } =
      await request.validate(CreateGsActivenessVal);

    for (const gradeId of grade_ids) {
      await GradeStudentFixedActiveness.updateOrCreate(
        {
          grade_id: gradeId,
          academic_year_id,
        },
        {
          fixed_payment_id,
        }
      );
    }

    await GsActivenessService.updateActiveness(
      grade_ids,
      academic_year_id,
      fixed_payment_id
    );
  },

  updateActiveness: async (
    gradeIds: string[],
    yearId: string,
    fixedPaymentId: string
  ) => {
    const gsService = new GradeStudentService();
    for (const gradeId of gradeIds) {
      const gradeStudents = await gsService.yearGradeStudents(yearId, gradeId);
      const promises: any[] = [];

      gradeStudents.forEach((gs) => {
        promises.push(
          new Promise(async (resolve) => {
            if (
              await FixedStudentPaymentService.studentPaid(gs.student_id, {
                grade_id: gs.grade_id,
                fixed_payment_id: fixedPaymentId,
              })
            ) {
              await gsService.setActive(gs.id);
            }

            resolve(true);
          })
        );
      });

      await Promise.all(promises);
    }
  },

  setActive: async (
    studentId: string,
    gradeId: string,
    yearId: string,
    fixedPaymentId: string
  ) => {
    const gsService = new GradeStudentService();
    const gs = await gsService.getByStudentGradeYear(
      studentId,
      gradeId,
      yearId
    );
    const activeness = await GsActivenessService.findOneNullable(
      fixedPaymentId,
      gradeId,
      yearId
    );

    if (gs !== null && activeness !== null) {
      await gsService.setActive(gs.id);
    }
  },
};

export default GsActivenessService;
