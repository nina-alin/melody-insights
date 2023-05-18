import { NextPage } from "next";

import NotAvailableYet from "@/components/common/states/not-available-yet";

const ArtistPage: NextPage = () => {
  return <NotAvailableYet />;
};

export default ArtistPage;

export async function getStaticProps(context: any) {
  return {
    notFound: true, // triggers 404
  };
}
