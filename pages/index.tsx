import { Client } from "gifbox.js"
import { PostPopularORSearchResponse } from "gifbox.js/dist/types/Responses"
import { Masonry } from "masonic"
import type { GetServerSidePropsContext } from "next"
import Trans from "next-translate/Trans"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import { useState } from "react"
import { AccountButtons } from "../components/Navigation/AccountButtons"

interface HomeProps {
    initPosts: PostPopularORSearchResponse
}

const SinglePost = ({ index, data, width }: any) => {
    return (
        <Link href={`/view/${data._id}-${data.slug}`}>
            <a>
                <img src={data.fullUrl} width={width} className="p-3" />
            </a>
        </Link>
    )
}

const Home = ({ initPosts }: HomeProps) => {
    const { t, lang } = useTranslation("home")
    const [posts, setPosts] = useState<PostPopularORSearchResponse>(initPosts)
    const [skip, setSkip] = useState(15)

    return (
        <div className="mx-auto w-11/12 md:w-4/5 xl:w-3/4">
            <div className="w-full">
                <div className="mb-16 flex flex-col items-center justify-center rounded-lg bg-blue-100 py-10 text-center shadow-black drop-shadow-xl dark:bg-slate-800">
                    <Trans
                        i18nKey="home:introduction.title"
                        components={[
                            <h1 className="text-6xl font-black" />,
                            <span className="text-blue-500" />,
                        ]}
                    />
                    <p className="mt-4 mb-8 text-xl text-gray-600 dark:text-slate-300">
                        {t("introduction.about")}
                    </p>
                    <AccountButtons />
                </div>
            </div>
            <h2 className="text-3xl font-black">{t("common:pages.home")}</h2>
            <Masonry items={posts} render={SinglePost} />
        </div>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const client = new Client({
        baseURL: process.env.GIFBOX_API!,
    })

    const post: PostPopularORSearchResponse = await client.post.popularPosts(
        15,
        0
    )

    return {
        props: {
            initPosts: post.map((x) => ({
                fullUrl: `${process.env.GIFBOX_API!}/file/posts/${
                    x.file.fileName
                }`,
                ...x,
            })),
        },
    }
}

export default Home
