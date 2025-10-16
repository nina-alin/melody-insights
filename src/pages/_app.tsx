import type { AppProps } from "next/app";
import { Noto_Sans_JP, Nunito } from "next/font/google";
import { Session } from "next-auth";
import { SessionProvider, getSession, GetSessionParams } from "next-auth/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "@/store";
import "./globals.css";
import RootLayout from "@/components/root-layout/root-layout";

const notoSansJP = Noto_Sans_JP({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--noto-sans-jp-variable",
});

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "cyrillic", "cyrillic-ext", "vietnamese"],
  fallback: ["--noto-sans-jp-variable", "sans-serif"],
  display: "swap",
  variable: "--nunito-variable",
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
          <div className={`${nunito.className} ${notoSansJP.className}`}>
            <div className="flex flex-col">
              <RootLayout>
                <main className="top-20 min-h-full flex-1 bg-spotify-background text-white focus:outline-offset-1 focus:outline-spotify-primary">
                  <Component {...pageProps} />
                </main>
              </RootLayout>
            </div>
          </div>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

// this line adds a warning a build. unfortunately, i can't really prevent this behavior.
// read more: https://stackoverflow.com/questions/74122252/you-have-opted-out-of-automatic-static-optimization-due-to-getinitialprops-in
App.getInitialProps = async ({
  ctx,
}: {
  ctx: GetSessionParams | undefined;
}) => {
  const session = await getSession(ctx);
  return { session };
};
