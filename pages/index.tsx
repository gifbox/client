import { Client } from "gifbox.js"
import { PostPopularResponse } from "gifbox.js/dist/types/Responses"
import { Masonry, useInfiniteLoader } from "masonic"
import type { GetServerSidePropsContext } from "next"
import Trans from "next-translate/Trans"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AccountButtons } from "../components/Navigation/AccountButtons"
import { useCookie } from "next-cookie"
import dynamic from "next/dynamic"

interface HomeProps {
    initPosts: PostPopularResponse
    loggedIn: boolean
    apiUrl: string
}

const SinglePost = ({ index, data, width }: any) => {
    return (
        <Link href={`/view/${data._id}-${data.slug}`}>
            <a>
                <img src={data.fullUrl} width={width} className="rounded-md" />
            </a>
        </Link>
    )
}

const CSRMasonry = dynamic(async () => Masonry, {
    ssr: false,
})

const Home = ({ initPosts, loggedIn, apiUrl }: HomeProps) => {
    const { t } = useTranslation("home")
    const [posts, setPosts] = useState<PostPopularResponse>([])
    const [gbClient, setGbClient] = useState<Client | null>(null)
    const [reachedEnd, setReachedEnd] = useState(false)

    useEffect(() => {
        setPosts((p) => [...initPosts, ...p])
    }, [])

    const fetchNext = async (
        startIndex: number,
        stopIndex: number,
        currentItems: any
    ) => {
        if (reachedEnd) return

        const limit = startIndex + stopIndex
        if (limit > 100) return

        if (!gbClient)
            setGbClient(
                new Client({
                    baseURL: apiUrl,
                })
            )

        const newPosts = await gbClient?.post.popularPosts(limit, startIndex)!

        if (typeof newPosts !== "undefined" && newPosts?.length === 0)
            setReachedEnd(true)

        const _posts = currentItems ?? []
        const _newPosts = newPosts ?? []

        const newPostsValue = _posts.concat(
            _newPosts.map((x) => ({
                fullUrl: `${apiUrl}/file/posts/${x.file.fileName}`,
                ...x,
            }))
        )

        if (posts.length > newPostsValue.length) return // Masonic does not like it when the data array gets smaller.

        setPosts(newPostsValue)
    }

    const maybeLoadMore = useInfiniteLoader(fetchNext, {
        isItemLoaded: (index, items) => !!items[index],
    })

    return (
        <div className="xl:xw-3/4 mx-auto w-11/12 md:w-4/5">
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
            <h2 className="mb-3 text-3xl font-black">
                {t("common:pages.home")}
            </h2>
            <Masonry
                items={posts}
                render={SinglePost}
                onRender={maybeLoadMore}
                columnGutter={15}
            />
        </div>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const cookie = useCookie(ctx)

    const client = new Client({
        baseURL: process.env.GIFBOX_API!,
    })

    const post: PostPopularResponse = await client.post.popularPosts(50, 0)

    return {
        props: {
            initPosts: post.map((x) => ({
                fullUrl: `${process.env.GIFBOX_API!}/file/posts/${
                    x.file.fileName
                }`,
                ...x,
            })),
            loggedIn: cookie.has("GIFBOX_TOKEN"),
            apiUrl: process.env.GIFBOX_API!,
        },
    }
}

export default Home
