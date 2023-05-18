import React from "react";

import { useRouter } from "next/router";

import { useGetUserQuery } from "@/pages/api/user.api";

import Footer from "./footer";
import NavBar from "./navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { isError } = useGetUserQuery();

  const isLandingPage = router.pathname === "/";

  // If there is an error and the user is not on the landing page, redirect to the landing page
  // The typeof window part is to prevent this from running on the server
  if (typeof window !== "undefined" && isError && !isLandingPage) {
    router.push("/");
  }

  return (
    <>
      {isLandingPage ? null : <NavBar />}

      {children}

      <Footer />
    </>
  );
};

export default RootLayout;
