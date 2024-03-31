import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { API_URL, WS_URL } from './urls';
import { excludedRoutes } from './excluded-routes';
import { onLogout } from '../utils/logout';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  credentials: 'include',
});

const wsLink = new GraphQLWsLink(createClient({ url: `ws://${WS_URL}/graphql` }));

export const logoutLink = onError(({ graphQLErrors }) => {
  if (
    graphQLErrors?.length &&
    (graphQLErrors[0]?.extensions?.originalError as any)?.statusCode === 401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: logoutLink.concat(splitLink),
  cache: new InMemoryCache(),
});
