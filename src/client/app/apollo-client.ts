import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { Request } from 'express';

import { Zeus, MapType, ValueTypes, ModelTypes } from './types/zeus';

type QueryTypes = ModelTypes['Query'];

const client = new ApolloClient({
  // TODO: make this configurable
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

export const typedQuery = async <Q extends ValueTypes['Query']>(
  query: Q,
  req: Request,
) => {
  const { data } = await client.query({
    query: gql(Zeus('query', query)),
    context: {
      headers: { Cookie: req.headers.cookie },
    },
  });

  const typedData = data as MapType<QueryTypes, Q>;

  return typedData;
};

export default client;
