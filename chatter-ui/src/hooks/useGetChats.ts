import { useQuery } from '@apollo/client';
import { graphql } from '../gql';
import { QueryChatsArgs } from '../gql/graphql';

export const getChatsDocument = graphql(`
  query Chats($skip: Float!, $limit: Float!) {
    chats(skip: $skip, limit: $limit) {
      ...ChatFragment
    }
  }
`);

export function useGetChats(variables: QueryChatsArgs) {
  return useQuery(getChatsDocument, { variables });
}
