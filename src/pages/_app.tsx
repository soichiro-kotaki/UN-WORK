import "@styles/tailwind.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>UN WORK</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width,initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
