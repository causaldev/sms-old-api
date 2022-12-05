import { column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import GradeStudent from '../../gradeStudent/gradeStudent';
import Quarter from '../../marklist/quarter/quarter';

export enum SkillEvaluation {
  E = 'E',
  G = 'G',
  N = 'N',
  P = 'P',
  R = 'R',
  NA = '',
}

export default class Skill extends Model {
  @column()
  public punctuality: SkillEvaluation;

  @column()
  public anthem_participation: SkillEvaluation;

  @column()
  public attendance: SkillEvaluation;

  @column()
  public completing_work: SkillEvaluation;

  @column()
  public follow_rules: SkillEvaluation;

  @column()
  public english_use: SkillEvaluation;

  @column()
  public listening: SkillEvaluation;

  @column()
  public class_participation: SkillEvaluation;

  @column()
  public handwriting: SkillEvaluation;

  @column()
  public communication_book_use: SkillEvaluation;

  @column()
  public material_handling: SkillEvaluation;

  @column()
  public cooperation: SkillEvaluation;

  @column()
  public school_uniform: SkillEvaluation;

  @column()
  public grade_student_id: string;

  @column()
  public quarter_id: string;

  @belongsTo(() => GradeStudent, {
    foreignKey: 'grade_student_id',
  })
  public gradeStudent: BelongsTo<typeof GradeStudent>;

  @belongsTo(() => Quarter, {
    foreignKey: 'quarter_id',
  })
  public quarter: BelongsTo<typeof Quarter>;
}
