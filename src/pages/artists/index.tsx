import { NextPage } from "next";

import NotAvailableYet from "@/components/common/states/not-available-yet";

const ArtistPage: NextPage = () => <NotAvailableYet />;

export async function getStaticProps() {
  return {
    notFound: true, // triggers 404
  };
}

export default ArtistPage;
