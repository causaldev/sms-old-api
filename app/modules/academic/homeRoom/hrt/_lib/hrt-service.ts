import { RequestContract } from '@ioc:Adonis/Core/Request';
import AcademicYear from 'app/modules/academic/academicYear/academicYear';
import GradeStudent from 'app/modules/academic/gradeStudent/gradeStudent';
import Hrt from '../hrt';
import { AssignHrtVal } from './hrt-val';

const HrtService = {
  assign: async (request: RequestContract) => {
    const { grade_id, user_id } = await request.validate(AssignHrtVal);
    console.log('assigned');

    return Hrt.create({
      grade_id,
      user_id,
    });
  },

  findOne: (id: string) => {
    return Hrt.findOrFail(id);
  },

  delete: async (hrtId: string) => {
    const hrt = await HrtService.findOne(hrtId);
    await hrt.delete();
  },

  getHRStudents: async (userId: string) => {
    const hrt = await Hrt.query().where('user_id', userId).firstOrFail();
    const year = await AcademicYear.getActiveYear();

    const gradeStudents = (await GradeStudent.query()
      .preload('student')
      .where('active', true)
      .where('grade_id', hrt.grade_id)
      .where('academic_year_id', year.id)) as GradeStudent[];

    const students = gradeStudents
      .map((i) => i.student)
      .sort((a, b) => a.first_name.localeCompare(b.first_name));

    return students;
  },
};

export default HrtService;
