import moment from 'moment';
import { RequestContract } from '@ioc:Adonis/Core/Request';
import PenaltyFactory from '../../penalty/_lib/penaltyFactory';
import PenaltyService from '../../penalty/_lib/penaltyService';
import FixedPayment from '../fixedPayment';
import { FixedPaymentEditVal } from './fixedPaymentVal';
import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';

const FixedPaymentService = {
  createFixed: async (data: any) => {
    return FixedPayment.create(data);
  },

  editFixed: async (id: string, request: RequestContract) => {
    const data = await request.validate(FixedPaymentEditVal);
    const payment = await FixedPaymentService.findOne(id);
    if (request.body().max_penalty === null) {
      data.max_penalty = null as any;
    }
    if (request.body().max_penalty_apply_days === null) {
      data.max_penalty_apply_days = null as any;
    }
    payment.merge(data as any);
    await payment.save();

    return payment;
  },

  findOne: (id: string) => {
    return FixedPayment.findByOrFail('id', id);
  },

  fetchActive: () => {
    return FixedPayment.query().where('archived', false);
  },

  fetchArchived: () => {
    return FixedPayment.query().where('archived', true);
  },

  fixedWithPending: async (id: string) => {
    const year = await AcademicYearService.getActive();
    const fixed = (
      await FixedPayment.query()
        .preload('fixedPendings', (fixedPendingBuilder) => {
          fixedPendingBuilder
            .preload('student', (studentBuilder) => {
              studentBuilder
                .preload('gradeStudents', (gsBuilder) => {
                  gsBuilder.where('academic_year_id', year.id);
                })
                .select('id', 'first_name', 'father_name');
            })
            .preload('grade', (gradeBuilder) => {
              gradeBuilder.select('id', 'name');
            })
            .select('id', 'discount_amount', 'student_id', 'grade_id');
        })
        .where('id', id)
        .firstOrFail()
    ).serialize() as FixedPayment;

    fixed.fixedPendings = fixed.fixedPendings.sort((a, b) =>
      a.student.first_name.localeCompare(b.student.first_name)
    );

    return fixed;
  },

  delete: async (id: string) => {
    const payment = await FixedPaymentService.findOne(id);
    await payment.delete();
  },

  getPenalty: async (id: string, slipDate: string | undefined) => {
    const payment = await FixedPaymentService.findOne(id);
    // console.log(payment.serialize());

    const penaltyRules = PenaltyFactory.fromFixed(payment);
    const payDate = slipDate ? moment(slipDate, 'YYYY-MM-DD') : moment();

    return PenaltyService.getPenalty(
      penaltyRules,
      payment.amount,
      moment(payment.effective_date.toFormat('yyyy-MM-dd'), 'YYYY-MM-DD'),
      payDate
    );
  },
};

export default FixedPaymentService;
