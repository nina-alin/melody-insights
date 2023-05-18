import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <button onClick={() => signOut()} type="button">
      Sign out
    </button>
  );
};

export default SignOut;
