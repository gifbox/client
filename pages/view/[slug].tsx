import type { GetServerSidePropsContext, NextApiResponse, NextPage } from "next"
import Trans from "next-translate/Trans"
import useTranslation from "next-translate/useTranslation"
import { Client, Responses } from "gifbox.js"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { redirect } from "next/dist/server/api-utils"
import GIFNotFound from "../../assets/illustrations/no-such-gif.svg"

interface ViewProps {
    error?: string
    file?: string
}

const View = ({ file, error }: ViewProps) => {
    const { t, lang } = useTranslation()
    const router = useRouter()

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
                <></>
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
                error: null,
                file: post.file.fileName,
            },
        }
    } catch (e: any) {
        const error = e.response?.data?.error ?? String(e)
        return {
            props: {
                error,
                file: null,
            },
        }
    }
}

export default View
