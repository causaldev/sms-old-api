import { schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export class CreateMessageDto extends Validator {
  public schema = schema.create({
    remark: schema.string(),
    entity_id: schema.string(),
    phone: schema.string(),
    parent_resource_id: schema.string.optional(),
    msg_type: schema.string.optional(),
  });
}
