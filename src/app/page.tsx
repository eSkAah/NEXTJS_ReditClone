import { auth } from "@/auth";
import Profile from "@/components/profile";

const Home = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div>
      {session?.user ? (
        <div>{JSON.stringify(session.user)}</div>
      ) : (
        <div>Signed Out</div>
      )}

      <Profile />
    </div>
  );
};

export default Home;
