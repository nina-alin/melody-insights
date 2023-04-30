import { SessionProvider, getSession } from "next-auth/react";
import "./globals.css";

import type { AppProps } from "next/app";
import { Session } from "next-auth";
import RootLayout from "@/components/root-layout/root-layout";
import { Provider } from "react-redux";

import { Nunito } from "next/font/google";
import { store } from "@/store";

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps,
  session,
}: AppProps & { session: Session }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <div className={nunito.className}>
          <div className="flex min-h-full flex-col">
            <RootLayout>
              <main className="top-20 flex-1 bg-stone-900 text-white">
                <Component {...pageProps} />
              </main>
            </RootLayout>
          </div>
        </div>
      </Provider>
    </SessionProvider>
  );
}

App.getInitialProps = async ({ ctx }) => {
  const session = await getSession(ctx);
  return { session };
};
