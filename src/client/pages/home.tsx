import React from 'react';
import { NextPage } from 'next';

const Home: NextPage<{ message: string; query: string }> = (props) => {
  const { message, query } = props;

  return (
    <div>
      <h1>Hello from NextJS! - Home</h1>
      {message}
      {query}
    </div>
  );
};

Home.getInitialProps = ({ query }) => {
  return {
    message: 'some initial props including query params',
    query: JSON.stringify(query),
  };
};

export default Home;
