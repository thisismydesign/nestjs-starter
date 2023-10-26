import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { Request } from 'express';

import { Zeus, ValueTypes, GraphQLTypes, InputType } from './types/zeus';

const client = new ApolloClient({
  // TODO: make this configurable
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

export const context = (req: Request) => {
  return { headers: { Cookie: req.headers.cookie } };
};

export const typedQuery = <Z extends ValueTypes[O], O extends 'Query'>(
  query: Z | ValueTypes[O],
  req: Request,
) => {
  return client.query<InputType<GraphQLTypes[O], Z>>({
    query: gql(Zeus('query', query)),
    context: context(req),
  });
};

export const typedMutation = <Z extends ValueTypes[O], O extends 'Mutation'>(
  mutation: Z | ValueTypes[O],
  req: Request,
) => {
  return client.mutate<InputType<GraphQLTypes[O], Z>>({
    mutation: gql(Zeus('mutation', mutation)),
    context: context(req),
  });
};

export default client;
