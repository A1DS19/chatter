import { useQuery } from '@apollo/client';
import { graphql } from '../gql';
import { GetMessagesQueryVariables } from '../gql/graphql';

export const getMessagesDocument = graphql(`
  query GetMessages($chatId: String!, $limit: Float!, $skip: Float!) {
    messages(chatId: $chatId, limit: $limit, skip: $skip) {
      ...MessageFragment
    }
  }
`);

export function useGetMessages(variables: GetMessagesQueryVariables) {
  return useQuery(getMessagesDocument, { variables });
}
