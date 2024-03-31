import { useQuery } from '@apollo/client';
import { graphql } from '../gql';

const getChatsDocument = graphql(`
  query Chats {
    chats {
      ...ChatFragment
    }
  }
`);

export function useGetChats() {
  return useQuery(getChatsDocument);
}
