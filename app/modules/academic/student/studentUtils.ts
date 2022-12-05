import { padZeros } from 'app/services/utils/stringUtils';
import AcademicYear from '../academicYear/academicYear';
import Student from './student';

const StudentUtils = {
  getUniqueId: async (): Promise<{ idNumber: string; idCounter: number }> => {
    const year = (await AcademicYear.getActiveYear()).year.toString();
    const yearSuffix = year.substring(year.length - 2);
    const student = await Student.query().orderBy('id_counter', 'desc').first();
    let idCounter = student?.serialize()?.id_counter || 0;

    while (
      (await Student.query()
        .where('id_number', `SA/${padZeros(++idCounter, 5)}/${yearSuffix}`)
        .first()) !== null
    ) {}

    return {
      idCounter,
      idNumber: `SA/${padZeros(++idCounter, 5)}/${yearSuffix}`,
    };
  },
};

export default StudentUtils;
