import { column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import GradeStudent from '../../gradeStudent/gradeStudent';
import Quarter from '../../marklist/quarter/quarter';

export default class Conduct extends Model {
  @column()
  public conduct: string;

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
