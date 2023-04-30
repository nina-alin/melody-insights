import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <button className="hidden md:block" onClick={() => signOut()}>
      Sign out
    </button>
  );
};

export default SignOut;
