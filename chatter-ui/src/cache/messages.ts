import { ApolloCache } from '@apollo/client';
import { Message } from '../gql/graphql';
import { getMessagesDocument } from '../hooks/useGetMessages';
import { PAGE_SIZE } from '../constants/page-size';

export function updateMessages(cache: ApolloCache<any>, message: Message) {
  const messagesQueryOptions = {
    query: getMessagesDocument,
    variables: {
      chatId: message.chatId,
      limit: PAGE_SIZE,
      skip: 0,
    },
  };

  const messages = cache.readQuery({
    ...messagesQueryOptions,
  });

  if (!messages || !message) return;

  cache.writeQuery({
    ...messagesQueryOptions,
    data: {
      messages: (messages.messages || []).concat(message),
    },
  });
}
