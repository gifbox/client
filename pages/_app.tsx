import "../styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import Navbar from "../components/Navigation/Navbar"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="icon" type="image/png" href="/favicon.png" />
                <title>GIFBox</title>
            </Head>
            <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
                <Navbar />
                <Component {...pageProps} />
            </div>
        </>
    )
}

export default MyApp
