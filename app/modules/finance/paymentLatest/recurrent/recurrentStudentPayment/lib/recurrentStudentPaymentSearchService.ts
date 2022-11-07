import { parsePage, parsePageSize } from 'app/services/utils/paginationUtils';
import RecurrentStudentPayment from '../recurrentStudentPayment';

const RecurrentStudentPaymentSearchService = {
  search: async (
    recurrentPaymentId: string,
    searchQuery: Record<string, any>
  ) => {
    const dbQuery = RecurrentStudentPayment.query()
      .where('recurrent_payment_id', recurrentPaymentId)
      .preload('recurrentPaymentChild', (childBuilder) => {
        childBuilder.select('description');
      })
      .preload('student')
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
    if (searchQuery.childDescription) {
      dbQuery.whereHas('recurrentPaymentChild', (childBuilder) => {
        childBuilder.where(
          'description',
          'like',
          `%${searchQuery.childDescription}%`
        );
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

export default RecurrentStudentPaymentSearchService;
