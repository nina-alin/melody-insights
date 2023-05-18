import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";
import { Session } from "next-auth";
import { SessionProvider, getSession, GetSessionParams } from "next-auth/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "@/store";
import "./globals.css";

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
        <PersistGate loading={null} persistor={persistor}>
          <div className={nunito.className}>
            <div className="flex flex-col">
              <main className="top-20 flex-1 bg-spotify-background text-white">
                <Component {...pageProps} />
              </main>
            </div>
          </div>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

App.getInitialProps = async ({
  ctx,
}: {
  ctx: GetSessionParams | undefined;
}) => {
  const session = await getSession(ctx);
  return { session };
};
