import Head from "next/head"

interface MetaTitleProps {
    children: string
}

const MetaTitle = ({ children }: MetaTitleProps) => {
    return (
        <Head>
            <title>{`${children} - GIFBox`}</title>
        </Head>
    )
}

export default MetaTitle
