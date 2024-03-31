import { useQuery } from '@apollo/client';
import { graphql } from '../gql';
import { GetMessagesQueryVariables } from '../gql/graphql';

export const getMessagesDocument = graphql(`
  query GetMessages($chatId: String!) {
    messages(chatId: $chatId) {
      ...MessageFragment
    }
  }
`);

export function useGetMessages(variables: GetMessagesQueryVariables) {
  return useQuery(getMessagesDocument, { variables });
}
