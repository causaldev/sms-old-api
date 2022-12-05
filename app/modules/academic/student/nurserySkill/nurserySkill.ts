import { column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import GradeStudent from '../../gradeStudent/gradeStudent';
import Quarter from '../../marklist/quarter/quarter';

export default class NurserySkill extends Model {
  @column()
  public acknowledges: string;

  @column()
  public greets: string;

  @column()
  public works_with_others: string;

  @column()
  public responds: string;

  @column()
  public accepts_responsibility: string;

  @column()
  public obeys_quickly: string;

  @column()
  public completes_work: string;

  @column()
  public listens_and_follows: string;

  @column()
  public work_independently: string;

  @column()
  public vocabulary_improvement: string;

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
