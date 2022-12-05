import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import { parsePage, parsePageSize } from 'app/services/utils/paginationUtils';
import FixedStudentPayment from '../fixedStudentPayment';

const FixedStudentPaymentSearchService = {
  search: async (fixedPaymentId: string, searchQuery: Record<string, any>) => {
    const year = await AcademicYearService.getActive();
    const dbQuery = FixedStudentPayment.query()
      .where('fixed_payment_id', fixedPaymentId)
      .preload('student', (studentBuilder) => {
        studentBuilder.preload('gradeStudents', (gsBuilder) => {
          gsBuilder.where('academic_year_id', year.id);
        });
      })
      .preload('grade');

    if (searchQuery.grade_id) {
      dbQuery.where('grade_id', searchQuery.grade_id);
    }
    if (searchQuery.student) {
      dbQuery.whereHas('student', (studentBuilder) => {
        studentBuilder
          .where('first_name', 'like', `%${searchQuery.student}%`)
          .orWhere('father_name', 'like', `%${searchQuery.student}%`);
      });
    }
    if (searchQuery.fs) {
      dbQuery.where('fs', searchQuery.fs);
    }
    if (searchQuery.attachment) {
      dbQuery.where('attachment', searchQuery.attachment);
    }
    if (searchQuery.start_date) {
      dbQuery.where('created_at', '>=', searchQuery.start_date);
    }
    if (searchQuery.end_date) {
      dbQuery.where('created_at', '<=', searchQuery.end_date);
    }

    return dbQuery.paginate(
      parsePage(searchQuery.page),
      parsePageSize(searchQuery.pageSize)
    );
  },
};

export default FixedStudentPaymentSearchService;
