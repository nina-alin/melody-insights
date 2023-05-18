import { NextPage } from "next";

import NotAvailableYet from "@/components/common/states/not-available-yet";

const ContactPage: NextPage = () => <NotAvailableYet />;

export default ContactPage;

export async function getStaticProps(context: any) {
  return {
    notFound: true, // triggers 404
  };
}
