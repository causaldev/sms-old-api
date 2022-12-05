import Factory from '@ioc:Adonis/Lucid/Factory';
import NurserySkill from 'app/modules/academic/student/nurserySkill/nurserySkill';

export const NurserySkillFactory = Factory.define(NurserySkill, ({ faker }) => {
  return {
    acknowledges: faker.lorem.sentence(),
    greets: faker.lorem.sentence(),
    works_with_others: faker.lorem.sentence(),
    responds: faker.lorem.sentence(),
    accepts_responsibility: faker.lorem.sentence(),
    obeys_quickly: faker.lorem.sentence(),
    completes_work: faker.lorem.sentence(),
    listens_and_follows: faker.lorem.sentence(),
    work_independently: faker.lorem.sentence(),
    vocabulary_improvement: faker.lorem.sentence(),
    grade_student_id: faker.lorem.sentence(),
    quarter_id: faker.lorem.sentence(),
  };
}).build();
