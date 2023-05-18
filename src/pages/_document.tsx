import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang={"en"}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Spotify Enhanced is a web app that provides you with insights about your Spotify account."
        />
        <meta property="og:title" content="Spotify Enhanced" />
        <meta
          property="og:description"
          content="Spotify Enhanced is a web app that provides you with insights about your Spotify account."
        />
        <link
          rel="canonical"
          href="https://spotify-enhanced.vercel.app/dashboard/"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
