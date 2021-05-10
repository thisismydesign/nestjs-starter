import React from 'react';
import { NextPage } from 'next';
import { Request } from 'express';

export async function getServerSideProps({ req }) {
  return {
    props: { user: (req as Request).user },
  };
}

type Props = ExtractPromiseType<ReturnType<typeof getServerSideProps>>;

const Profile: NextPage<Props['props']> = (props) => {
  const { user } = props;

  return <h1>Profile {JSON.stringify(user)}</h1>;
};

export default Profile;
