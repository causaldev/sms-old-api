import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import User from 'app/modules/auth/user';
// import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
// import { GradeFactory } from 'app/test/modules/academic/grade/gradeFactory';
// import { SubjectFactory } from 'app/test/modules/academic/marklist/subject/subjectFactory';
// import { TeacherFactory } from 'app/test/modules/academic/teacher/teacherFactory';
// import { UserFactory } from 'app/test/modules/auth/userFactory';
const roles = require('../roles');

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.create({
      first_name: 'Super',
      father_name: 'Admin',
      email: 'super@m.com',
      permissions: JSON.stringify(roles),
      password: 'Secret1##',
    });
    // await UserFactory.merge({
    //   email: 'super-admin@m.com',
    //   permissions: JSON.stringify(roles),
    // }).create();

    // await TeacherFactory.with('user').createMany(2);
    // await GradeFactory.create();
    // await SubjectFactory.createMany(2);
    // await AcademicYearFactory.merge({ active: true }).create();
  }
}
