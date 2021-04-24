import React from 'react';
import { NextPage } from 'next';

const Home: NextPage<{ data: string }> = (props) => {
  const { data } = props;

  return (
    <div>
      <h1>Hello from NextJS! - Home</h1>
      {data}
    </div>
  );
};

Home.getInitialProps = ({ query }) => {
  return {
    data: `some initial props including query params and controller data: ${JSON.stringify(
      query,
    )}`,
  };
};

export default Home;
