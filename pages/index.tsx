import { Client } from "gifbox.js"
import { PostPopularResponse } from "gifbox.js/dist/types/Responses"
import { Masonry } from "masonic"
import type { GetServerSidePropsContext } from "next"
import Trans from "next-translate/Trans"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import { useState } from "react"
import { AccountButtons } from "../components/Navigation/AccountButtons"
import { useCookie } from "next-cookie"

interface HomeProps {
    initPosts: PostPopularResponse
    loggedIn: boolean
}

const SinglePost = ({ index, data, width }: any) => {
    return (
        <Link href={`/view/${data._id}-${data.slug}`}>
            <a>
                <img
                    src={data.fullUrl}
                    width={width}
                    className="rounded-xl p-2"
                />
            </a>
        </Link>
    )
}

const Home = ({ initPosts, loggedIn }: HomeProps) => {
    const { t, lang } = useTranslation("home")
    const [posts, setPosts] = useState<PostPopularResponse>(initPosts)
    const [skip, setSkip] = useState(15)

    return (
        <div className="mx-auto w-11/12 md:w-4/5 xl:w-3/4">
            {loggedIn ? (
                <div className="w-full">
                    <div className="mb-7 flex flex-col items-center justify-center rounded-lg bg-blue-100 py-10 px-10 text-center dark:bg-slate-800">
                        <p className="text-3xl font-bold">
                            {t("in_progress.hey")}
                        </p>
                        <Trans
                            i18nKey="home:in_progress.paragraph"
                            components={[
                                <h1 className="mt-4 text-lg text-gray-600 dark:text-slate-300 md:px-10 lg:px-20" />,
                                <a
                                    href="https://rvlt.gg/gifbox"
                                    className="font-bold text-red-500"
                                />,
                            ]}
                        />
                    </div>
                </div>
            ) : (
                <div className="w-full">
                    <div className="mb-7 flex flex-col items-center justify-center rounded-lg bg-blue-100 py-10 px-10 text-center dark:bg-slate-800">
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
            )}
            <h2 className="text-3xl font-bold">{t("common:pages.home")}</h2>
            <Masonry items={posts} render={SinglePost} />
        </div>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const cookie = useCookie(ctx)

    const client = new Client({
        baseURL: process.env.GIFBOX_API!,
    })

    const post: PostPopularResponse = await client.post.popularPosts(15, 0)

    return {
        props: {
            initPosts: post.map((x) => ({
                fullUrl: `${process.env.GIFBOX_API!}/file/posts/${
                    x.file.fileName
                }`,
                ...x,
            })),
            loggedIn: cookie.has("GIFBOX_TOKEN"),
        },
    }
}

export default Home
