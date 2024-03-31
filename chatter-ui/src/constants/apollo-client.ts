import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { API_URL } from './urls';
import { excludedRoutes } from './excluded-routes';
import { onLogout } from '../utils/logout';

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  credentials: 'include',
});

export const logoutLink = onError(({ graphQLErrors }) => {
  if (
    graphQLErrors?.length &&
    (graphQLErrors[0]?.extensions?.originalError as any).statusCode === 401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

export const client = new ApolloClient({
  link: logoutLink.concat(httpLink),
  cache: new InMemoryCache(),
});
