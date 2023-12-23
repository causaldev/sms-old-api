import { RequestContract } from '@ioc:Adonis/Core/Request';
import TextMessage from './textMessage';
import { CreateMessageDto } from './dtos/createMessageDto';
import { transactLocalized } from 'app/services/utils';

export const TextMessageService = {
  getMessages: async (
    nonSent?: boolean,
    parentId?: string,
    mark_sent?: boolean
  ) => {
    const query = TextMessage.query();

    if (nonSent) {
      query.where('msg_sent', false);
    }

    if (parentId) {
      query.where('parent_resource_id', parentId);
    }

    const result = await query;

    if (mark_sent) {
      await TextMessage.query()
        .whereIn(
          'id',
          result.map((item) => item.id)
        )
        .update({ msg_sent: true });
    }

    return result;
  },

  create: async (request: RequestContract) => {
    const data = await request.validate(CreateMessageDto);

    await transactLocalized(async (trx) => {
      const actions = data.data.map((item) =>
        TextMessage.updateOrCreate(
          { entity_id: item.entity_id },
          { ...item, msg_tags: JSON.stringify(item.msg_tags), msg_sent: false },
          { client: trx }
        )
      );

      await Promise.all(actions);
    });

    return true;
  },
};
