import Head from "next/head";
import { type AppProps } from "next/app";

import "../styles/globals.css";
import { Layout } from "../components";

const App = ({ Component, pageProps, router }: AppProps) => {
    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ef74cc" />
                <meta name="msapplication-TileColor" content="#ef74cc" />
                <meta name="theme-color" content="#ef74cc" />
            </Head>
            <Layout>
                <Component key={router.route} {...pageProps} />
            </Layout>
        </>
    );
};

export default App;
