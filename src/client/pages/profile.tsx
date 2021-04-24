import React from 'react';
import { NextPage } from 'next';
import { Request } from 'express';

const Profile: NextPage<{ user: Request['user'] }> = (props) => {
  const { user } = props;

  return <h1>Profile {JSON.stringify(user)}</h1>;
};

Profile.getInitialProps = async ({ req }) => {
  return {
    user: (req as Request).user,
  };
};

export default Profile;
