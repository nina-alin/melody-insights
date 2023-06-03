import { NextPage } from "next";

import NotAvailableYet from "@/components/common/states/not-available-yet";
import Head from "next/head";

const ArtistPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Artist Page</title>
        <meta name="description" content="General Artist Page" key="desc" />
      </Head>
      <div className={"flex min-h-full flex-col gap-8 p-12"}>
        <NotAvailableYet />
      </div>
    </>
  );
};

export default ArtistPage;
