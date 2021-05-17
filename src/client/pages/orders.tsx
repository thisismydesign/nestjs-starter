import React from 'react';
import { NextPage, InferGetStaticPropsType } from 'next';
import { Request } from 'express';

import { typedQuery } from '../app/apollo-client';

export async function getServerSideProps({ req }) {
  const data = await typedQuery(
    { orders: { alias: true, thing: { name: true } } },
    req,
  );

  return {
    props: { user: (req as Request).user, orders: data.orders },
  };
}

const Orders: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = (props) => {
  return (
    <div>
      <h1>Orders overview</h1>
      {JSON.stringify(props)}
    </div>
  );
};

export default Orders;
