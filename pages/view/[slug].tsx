import type { GetServerSidePropsContext, NextApiResponse } from "next"
import useTranslation from "next-translate/useTranslation"
import { Client, Responses } from "gifbox.js"
import { redirect } from "next/dist/server/api-utils"
import GIFNotFound from "../../assets/illustrations/no-such-gif.svg"
import Link from "next/link"
import Button from "../../components/UI/Button"
import Tag from "../../components/UI/Tag"
import { CheckCircle } from "@styled-icons/boxicons-solid"

interface ViewProps {
    error?: string
    gifUrl?: string
    data?: Responses.PostInfoResponse
}

const View = ({ gifUrl, error, data }: ViewProps) => {
    const { t, lang } = useTranslation("view")

    const downloadAsWebp = () => {
        window.open(gifUrl, "_blank")
    }

    if (error === "Post not found") {
        return (
            <div className="flex flex-col items-center justify-center py-28 text-center">
                <img
                    alt="404"
                    src={GIFNotFound.src}
                    className="pointer-events-none w-24"
                />
                <h1 className="mt-12 pb-4 text-2xl font-black text-blue-600 sm:text-4xl">
                    {t("common:error_pages.gif_not_found.title")}
                </h1>
                <p className="text-gray-500">
                    {t("common:error_pages.gif_not_found.subtitle")}
                </p>
            </div>
        )
    }

    return (
        <div className="mx-auto w-11/12 md:w-4/5 xl:w-3/4">
            {error ? (
                <div className="rounded-lg bg-pink-200 p-4 text-center dark:bg-pink-900">
                    <h1 className="text-4xl font-black">{error}</h1>
                    <p className="dark:text-gray-300">
                        {t("common:try_again")}
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-3 xl:flex-row">
                    <div className="mb-4 flex flex-col">
                        <div className="md:p-4 xl:mr-4 xl:w-96 xl:rounded-lg xl:bg-blue-50 xl:shadow-black xl:drop-shadow-md xl:dark:bg-slate-800">
                            <img src={gifUrl} className="xl:w-96" />
                            <Button
                                className="mt-4 w-full"
                                onClick={downloadAsWebp}
                            >
                                {t("download_webp")}
                            </Button>
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-1">
                        <h1 className="mb-4 text-3xl font-black">
                            {data?.title}
                        </h1>
                        <h2 className="text-lg font-bold">{t("tags")}</h2>
                        <div className="flex flex-wrap gap-2">
                            {data?.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/search?q=${encodeURIComponent(
                                        tag
                                    )}`}
                                    locale={lang}
                                >
                                    <Tag>{tag}</Tag>
                                </Link>
                            ))}
                        </div>
                        <h2 className="mt-4 text-lg font-bold">
                            {t("author")}
                        </h2>
                        <div className="flex w-full items-center rounded-lg bg-blue-50 p-4 dark:bg-slate-800">
                            <div className="h-12 w-12 rounded-full bg-slate-700"></div>
                            <h4 className="ml-4 flex items-center text-xl font-bold">
                                {data?.author.displayName}
                                {data?.author.verified && (
                                    <span className="ml-1.5 mb-1 text-blue-500">
                                        <CheckCircle size={20} />
                                    </span>
                                )}
                            </h4>
                            <span className="ml-2 text-sm font-normal opacity-50">
                                @{data?.author.username}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const originalSlug = ctx.params!.slug
    const id = (ctx.params!.slug as string).slice(0, 11)

    const client = new Client({
        baseURL: process.env.GIFBOX_API!,
    })

    try {
        const post: Responses.PostInfoResponse = await client.post.queryPost(id)

        const constructedSlug = `${post._id}-${post.slug}`

        if (originalSlug !== constructedSlug) {
            redirect(ctx.res as NextApiResponse, 302, constructedSlug)
        }

        return {
            props: {
                gifUrl: `${process.env.GIFBOX_API!}/file/posts/${
                    post.file.fileName
                }`,
                data: post,
            },
        }
    } catch (e: any) {
        const error = e.response?.data?.error ?? String(e)
        return {
            props: {
                error,
            },
        }
    }
}

export default View
