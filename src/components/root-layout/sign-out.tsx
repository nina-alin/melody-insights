import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: `${window.location.origin}`,
        })
      }
      type="button"
    >
      Sign out
    </button>
  );
};

export default SignOut;
