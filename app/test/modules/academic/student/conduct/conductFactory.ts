import Factory from '@ioc:Adonis/Lucid/Factory';
import Conduct from 'app/modules/academic/student/conduct/conduct';

export const ConductFactory = Factory.define(Conduct, ({ faker }) => {
  return {
    conduct: faker.lorem.sentence(),
    grade_student_id: faker.lorem.sentence(),
    quarter_id: faker.lorem.sentence(),
  };
}).build();
