import { useQuery } from '@apollo/client';
import { graphql } from '../gql';

const getMeDocument = graphql(`
  query getMe {
    me {
      _id
      email
    }
  }
`);

export function useGetMe() {
  return useQuery(getMeDocument);
}
