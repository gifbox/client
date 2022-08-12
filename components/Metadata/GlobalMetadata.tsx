import Head from "next/head"

const GlobalMetadata = () => {
    return (
        <Head>
            <title>GIFBox</title>
            <meta property="theme-color" content="#3b82f6" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="og:site-name" content="GIFBox" />
            <link rel="icon" type="image/png" href="/favicon.png" />
            <link rel="apple-touch-icon" href="/favicon.png" />
        </Head>
    )
}

export default GlobalMetadata
