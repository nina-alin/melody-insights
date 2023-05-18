import React from "react";

import { useRouter } from "next/router";

import { useGetUserQuery } from "@/pages/api/user.api";

import Footer from "./footer";
import NavBar from "./navbar";
import Loading from "@/components/common/states/loading";

type RootLayoutProps = {
  children: React.ReactNode;
};
const RootLayout = ({ children }: RootLayoutProps) => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetUserQuery();

  if (isLoading) {
    return <Loading />;
  }

  const isLandingPage = router.pathname === "/";
  const isErrorUser = isError || !data;

  // If there is an error and the user is not on the landing page, redirect to the landing page
  // The typeof window part is to prevent this from running on the server
  if (typeof window !== "undefined" && isErrorUser && !isLandingPage) {
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
