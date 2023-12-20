import TextMessage from './textMessage';

export const TextMessageService = {
  getNonSent: (parentId?: string) => {
    const query = TextMessage.query().where('msg_sent', false);

    if (parentId) {
      query.where('parent_resource_id', parentId);
    }

    return query;
  },
};
