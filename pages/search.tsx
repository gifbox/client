import { Client } from "gifbox.js"
import {
    PostPopularResponse,
    PostSearchResponse,
} from "gifbox.js/dist/types/Responses"
import { Masonry, useInfiniteLoader } from "masonic"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Spinner from "../components/UI/Spinner"
import SearchBar from "../components/UI/SearchBar"
import MetaTitle from "../components/Metadata/MetaTitle"

interface HomeProps {
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

const Search = ({ apiUrl }: HomeProps) => {
    const { t } = useTranslation("search")

    const {
        query: { q },
    } = useRouter()

    const [posts, setPosts] = useState<PostPopularResponse>([])
    const [reachedEnd, setReachedEnd] = useState(false)
    const [showMasonry, setShowMasonry] = useState(false)
    const [initialResponse, setInitialResponse] =
        useState<PostSearchResponse | null>(null)

    const fetchNext = async (
        startIndex: number,
        stopIndex: number,
        currentItems: any
    ) => {
        if (reachedEnd) return

        const limit = startIndex + stopIndex
        if (limit > 100) return

        const gbClient = new Client({
            baseURL: apiUrl,
        })

        const newPosts = await gbClient?.post.searchPosts(
            q as string,
            limit,
            startIndex
        )!

        if (!initialResponse) setInitialResponse(newPosts)

        if (
            typeof newPosts.hits !== "undefined" &&
            newPosts?.hits?.length === 0
        ) {
            setReachedEnd(true)
        }

        const _posts = currentItems ?? []
        const _newPosts = newPosts ?? []

        const newPostsValue = _posts.concat(
            _newPosts.hits.map((x) => ({
                fullUrl: `${apiUrl}/file/posts/${x.file.fileName}`,
                ...x,
            }))
        )

        if (posts.length > newPostsValue.length) return // Masonic does not like it when the data array gets smaller.

        setPosts(newPostsValue)
        setShowMasonry(true)
    }

    useEffect(() => {
        if (reachedEnd === false) {
            fetchNext(0, 20, [])
        }
    }, [reachedEnd])

    useEffect(() => {
        if (!q) return
        setShowMasonry(false)
        setPosts([])
        setInitialResponse(null)
        setReachedEnd(false)
    }, [q])

    const maybeLoadMore = useInfiniteLoader(fetchNext, {
        isItemLoaded: (index, items) => !!items[index],
    })

    if (!q) {
        return (
            <div className="flex flex-col items-center justify-center py-28 text-center">
                <h1 className="mt-12 bg-gradient-to-r from-indigo-500 to-pink-600 bg-clip-text pb-4 font-header text-2xl font-bold tracking-wide text-transparent sm:text-4xl lg:text-6xl">
                    {t("no_query")}
                </h1>
                <p className="mt-4 text-gray-500">{t("nothing")}</p>
            </div>
        )
    }

    return (
        <div className="mx-auto w-11/12 md:w-4/5 xl:w-3/4">
            <MetaTitle>{q as string}</MetaTitle>
            <SearchBar className="mb-4 w-full md:hidden" />
            <h2 className="mb-3 font-header text-3xl font-bold tracking-wide">
                {t("results", { query: q })}
            </h2>
            {initialResponse !== null && posts.length >= 1 && (
                <h3 className="mb-3 text-gray-400 dark:text-slate-500">
                    {t("statistics", {
                        count: initialResponse?.numHits,
                        ms: initialResponse?.tookMs,
                    })}
                </h3>
            )}
            {showMasonry ? (
                posts.length >= 1 ? (
                    <Masonry
                        items={posts}
                        render={SinglePost}
                        onRender={maybeLoadMore}
                        columnGutter={15}
                    />
                ) : (
                    <div className="mt-10 text-center">
                        <div className="text-xl font-bold text-gray-600 dark:text-slate-300">
                            {t("nothing")}
                        </div>
                        <div className="text-gray-400 dark:text-slate-500">
                            {t("refine_query")}
                        </div>
                    </div>
                )
            ) : (
                <Spinner />
            )}
        </div>
    )
}

export async function getServerSideProps() {
    return {
        props: {
            apiUrl: process.env.GIFBOX_API!,
        },
    }
}

export default Search
