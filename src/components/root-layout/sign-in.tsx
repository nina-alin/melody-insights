import { signIn } from "next-auth/react";

const SignIn = () => {
  return <button onClick={() => signIn("spotify")}>Log in</button>;
};

export default SignIn;
