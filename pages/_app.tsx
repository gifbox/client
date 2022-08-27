import "../styles/globals.css"
import type { AppProps } from "next/app"
import Navbar from "../components/Navigation/Navbar"
import { AppStateProvider } from "../lib/useAppState"
import { Toaster } from "react-hot-toast"
import GlobalMetadata from "../components/Metadata/GlobalMetadata"
import Footer from "../components/Navigation/Footer"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppStateProvider>
            <GlobalMetadata />
            <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
                <Navbar />
                <Component {...pageProps} />
                <Footer />
            </div>
            <Toaster />
        </AppStateProvider>
    )
}

export default MyApp
