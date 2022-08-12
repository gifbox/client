import Head from "next/head"

interface MetaDescriptionProps {
    children: string
}

const MetaDescription = ({ children }: MetaDescriptionProps) => {
    return (
        <Head>
            <meta property="og:description" content={children} />
        </Head>
    )
}

export default MetaDescription
