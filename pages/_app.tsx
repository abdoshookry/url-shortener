import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Url Shortener</title>
        <meta name="description" content="Url Shortener" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
