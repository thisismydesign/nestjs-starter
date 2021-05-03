import React from 'react';
import { NextPage } from 'next';
import { Request } from 'express';

import { typedQuery } from '../app/apollo-client';

const Orders: NextPage<{ user: Request['user'] }> = (props) => {
  return (
    <div>
      <h1>Orders overview</h1>
      {JSON.stringify(props)}
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const data = await typedQuery(
    { orders: { alias: true, thing: { name: true } } },
    req,
  );

  return {
    props: { user: (req as Request).user, orders: data.orders },
  };
}

export default Orders;
