import { RequestContract } from '@ioc:Adonis/Core/Request';
import Teacher from '../teacher';
import { CreateTeacherVal } from './teacher-val';

const TeacherService = {
  create: async (request: RequestContract) => {
    const { user_id } = await request.validate(CreateTeacherVal);

    return Teacher.create({ user_id });
  },

  findAll: () => {
    return Teacher.query().preload('user', (userBuilder) => {
      userBuilder.preload('hrt', (hrtBuilder) => {
        hrtBuilder.preload('grade');
      });
    });
  },
};

export default TeacherService;
