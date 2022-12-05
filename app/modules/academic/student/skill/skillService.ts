import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Service from 'app/modules/_shared/service';
import AcademicYearService from '../../academicYear/academicYearService';
import GradeStudent from '../../gradeStudent/gradeStudent';
import Skill from './skill';
import SkillRepo from './skillRepo';

export default class SkillService extends Service<Skill> {
  constructor() {
    super(new SkillRepo());
  }

  create(createData: Partial<Skill>, _auth?: AuthContract): Promise<Skill> {
    return this.repo.updateOrCreateModel(
      {
        quarter_id: createData.quarter_id,
        grade_student_id: createData.grade_student_id,
      },
      createData
    );
  }

  async fetchStudent(studentId: string) {
    const year = await AcademicYearService.getActive();
    const skill = await GradeStudent.query()
      .where('student_id', studentId)
      .where('academic_year_id', year.id)
      .preload('skills', (skillBuilder) => {
        skillBuilder.preload('quarter');
      })
      .first();

    return skill;
  }
}
