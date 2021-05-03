import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { Request } from 'express';

import { Zeus, MapType, Query, ValueTypes } from './types/graphql-zeus';

const client = new ApolloClient({
  // TODO: make this configurable
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

export const context = (req: Request) => {
  return {
    headers: {
      authorization: `Bearer ${req.cookies['jwt']}`,
    },
  };
};

export const typedQuery = async <Q extends ValueTypes['Query']>(
  query: Q,
  req: Request,
) => {
  const { data } = await client.query({
    query: gql(Zeus.query(query)),
    context: context(req),
  });

  const typedData = data as MapType<Query, Q>;

  return typedData;
};

export default client;
