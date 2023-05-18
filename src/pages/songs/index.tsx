import { NextPage } from "next";

import NotAvailableYet from "@/components/common/states/not-available-yet";

const SongPage: NextPage = () => {
  return <NotAvailableYet />;
};

export default SongPage;

export async function getStaticProps(context: any) {
  return {
    notFound: true, // triggers 404
  };
}
