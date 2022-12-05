import Factory from '@ioc:Adonis/Lucid/Factory';
import Skill from 'app/modules/academic/student/skill/skill';
import { GradeStudentFactory } from '../../gradeStudent/gradeStudentFactory';

export const SkillFactory = Factory.define(Skill, ({ faker }) => {
  return {
    punctuality: undefined,
    anthem_participation: undefined,
    attendance: undefined,
    completing_work: undefined,
    follow_rules: undefined,
    english_use: undefined,
    listening: undefined,
    class_participation: undefined,
    handwriting: undefined,
    communication_book_use: undefined,
    material_handling: undefined,
    cooperation: undefined,
    school_uniform: undefined,
    grade_student_id: faker.lorem.sentence(),
  };
})
  .relation('gradeStudent', () => GradeStudentFactory)
  .build();
