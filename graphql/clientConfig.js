import { ApolloLink, concat, split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { onError } from 'apollo-link-error'
import 'subscriptions-transport-ws' // this is the default of apollo-link-ws

const GrapQL_Https_URL = 'http://localhost:8080/v1/graphql'
const GrapQL_Wss_URL = 'http://localhost:8080/v1/graphql'

export default (ctx) => {
  // HttpLink
  const httpLink = new HttpLink({ uri: GrapQL_Https_URL });

  // Error handling
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    if (networkError) console.log(`[Network error]: ${networkError}`)
  });

  // Auth Middleware for Authorization Header
  const authMiddleware = new ApolloLink((operation, forward) => {
    // const token = process.server ? ctx.req.session : window.__NUXT__.state.session
    const token = 'anonymous'
    // const useTokenInRequestMiddleware = ctx.store.state.auth.useTokenInRequest;

    // token available and use is permitted
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    }
    operation.setContext({
    })
    return forward(operation)
  });

  // Set up subscription
  const wsLink = process.browser ? new WebSocketLink({
    uri: GrapQL_Wss_URL,
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: () => {
        const useToken = ctx.store.state.auth.useTokenInRequest;
        const token = process.browser ? ctx.store.state.auth.idToken : ctx.req.session;
        if (token && useToken) {
          return {
            headers: {
              Authorization: token ? `Bearer ${token}` : null,
              // HASURA_GRAPHQL_UNAUTHORIZED_ROLE: `anonymous`
            }
          }
        }
      }
    }
  }) : null;

  const link = process.browser ? split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
  ) : httpLink;

  return {
    link: concat(authMiddleware, link, errorLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
    ctx
  }
}