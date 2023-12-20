import { column } from '@ioc:Adonis/Lucid/Orm';
import Model from '../_shared/model';

export default class TextMessage extends Model {
  @column()
  public remark: string;

  @column()
  public entity_id: string;

  @column()
  public phone: string;

  @column()
  public parent_resource_id: string | null;

  @column({})
  public msg_type: string | null;

  @column()
  public msg_sent: boolean;
}
