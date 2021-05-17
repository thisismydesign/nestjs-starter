import React from 'react';
import { NextPage, InferGetStaticPropsType } from 'next';
import { Request } from 'express';

export async function getServerSideProps({ req }) {
  return {
    props: { user: (req as Request).user },
  };
}

const Profile: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = (props) => {
  const { user } = props;

  return <h1>Profile {JSON.stringify(user)}</h1>;
};

export default Profile;
