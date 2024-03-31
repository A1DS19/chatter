import { useMutation } from '@apollo/client';
import { graphql } from '../gql';
import { ChatFragment } from '../fragments/chat.fragment';

const createChatDocument = graphql(`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      ...ChatFragment
    }
  }
`);

export function useCreateChat() {
  return useMutation(createChatDocument, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          chats(existingChats = []) {
            const newChatRef = cache.writeFragment({
              data: data?.createChat,
              fragment: ChatFragment,
            });
            return [newChatRef, ...existingChats];
          },
        },
      });
    },
  });
}