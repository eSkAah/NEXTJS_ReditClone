"use client";

import { useSession } from "next-auth/react";

const Profile = () => {
  const session = useSession();

  if (session?.data?.user) {
    return <div>{JSON.stringify(session.data.user)}</div>;
  }

  return <div> From Client: User is not signed In</div>;
};

export default Profile;
