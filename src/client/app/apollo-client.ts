import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { Request } from 'express';

import { Zeus, ValueTypes, GraphQLTypes, InputType } from './types/zeus';

const client = new ApolloClient({
  // TODO: make this configurable
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

export const typedQuery = <Z extends ValueTypes[O], O extends 'Query'>(
  query: Z | ValueTypes[O],
  req: Request,
  operationName?: string,
) => {
  return client.query<InputType<GraphQLTypes[O], Z>>({
    query: gql(Zeus('query', query, operationName)),
    context: { headers: { Cookie: req.headers.cookie } },
  });
};

export default client;
