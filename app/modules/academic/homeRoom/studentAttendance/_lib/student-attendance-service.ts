import { RequestContract } from '@ioc:Adonis/Core/Request';
import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import GradeStudent from 'app/modules/academic/gradeStudent/gradeStudent';
import { amharicDays } from 'app/modules/_shared/types';
import { massSerialize, transactLocalized } from 'app/services/utils';
import { convertToEthiopianRaw } from 'app/services/utils/timeUtils';
import moment from 'moment';
import StudentAttendance from '../student-attendance';
import { CreateStudentAttendanceVal } from './student-attendance-val';

const StudentAttendanceService = {
  create: async (request: RequestContract, userId: string) => {
    // TODO: Add teacher is hrt check
    const { data, date } = await request.validate(CreateStudentAttendanceVal);
    const year = await AcademicYearService.getActive();

    await transactLocalized(async (trx) => {
      for (let i = 0; i < data.length; i++) {
        const promises: Promise<any>[] = [];
        promises.push(
          StudentAttendance.updateOrCreate(
            {
              student_id: data[i].student_id,
              date: date.toISODate() as any,
              academic_year_id: year.id,
            },
            {
              user_id: userId,
              absent_reason: data[i].absent_reason || '',
              status: data[i].status,
              msg_sent: false,
            },
            { client: trx }
          )
        );
        await Promise.all(promises);
      }
    });
  },

  findUnsent: async () => {
    const attendances = massSerialize(
      await StudentAttendance.query()
        .whereIn('status', ['Absent', 'Late'])
        .preload('student')
        .whereHas('student', (studentBuilder) => {
          studentBuilder.whereNotNull('primary_phone');
        })
        .where('msg_sent', false)
    ) as any;

    StudentAttendance.query()
      .update({
        msg_sent: true,
      })
      .then(() => {});

    const mapped = attendances.map((attendance) => ({
      ...attendance,
      day: amharicDays[moment(attendance.date).day()],
      ethiopianDate: convertToEthiopianRaw(attendance.date),
    }));

    return mapped.sort((a, b) =>
      a.student.first_name.localeCompare(b.student.first_name)
    );
  },

  fetchGradeDateAttendance: async (gradeId: string, date: string) => {
    const year = await AcademicYearService.getActive();

    // TODO: Move to service file
    const studentIds = (
      await GradeStudent.query()
        .where('academic_year_id', year.id)
        .where('grade_id', gradeId)
    ).map((i) => i.student_id);

    const attendances = await StudentAttendance.query()
      .where('academic_year_id', year.id)
      .whereIn('student_id', studentIds)
      .where('date', date)
      .preload('student');

    return attendances.sort((a, b) =>
      a.student.first_name.localeCompare(b.student.first_name)
    );
  },
};

export default StudentAttendanceService;
