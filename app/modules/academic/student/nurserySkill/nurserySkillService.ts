import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Service from 'app/modules/_shared/service';
import AcademicYearService from '../../academicYear/academicYearService';
import GradeStudent from '../../gradeStudent/gradeStudent';
import NurserySkill from './nurserySkill';
import NurserySkillRepo from './nurserySkillRepo';

export default class NurserySkillService extends Service<NurserySkill> {
  constructor() {
    super(new NurserySkillRepo());
  }

  create(
    createData: Partial<NurserySkill>,
    _auth?: AuthContract
  ): Promise<NurserySkill> {
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
      .preload('nurserySkills', (skillBuilder) => {
        skillBuilder.preload('quarter');
      })
      .first();

    return skill;
  }
}
