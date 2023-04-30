import { signOut, useSession } from "next-auth/react";
import Footer from "./footer";
import NavBar from "./navbar";
import { useEffect } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  // TODO: doesn't work
  useEffect(() => {
    if (session && new Date(session.expires) < new Date()) {
      // The session has expired, sign out the user
      signOut();
    }
  }, [session]);

  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default RootLayout;
