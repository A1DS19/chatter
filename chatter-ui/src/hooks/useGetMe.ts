import { useQuery } from '@apollo/client';
import { graphql } from '../gql';

const getMeDocument = graphql(`
  query getMe {
    me {
      ...UserFragment
    }
  }
`);

export function useGetMe() {
  return useQuery(getMeDocument);
}
