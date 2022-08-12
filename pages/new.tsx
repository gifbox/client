import Illustration from "../assets/illustrations/new-post.svg"
import useTranslation from "next-translate/useTranslation"
import FileButton from "../components/UI/FileButton"
import { useEffect, useState } from "react"
import { Client } from "gifbox.js"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import Spinner from "../components/UI/Spinner"
import GifUploadSettings from "../components/Sections/GifUploadSettings"
import { redirect } from "next/dist/server/api-utils"
import { useCookie } from "next-cookie"
import { GetServerSidePropsContext, NextApiResponse } from "next"
import MetaTitle from "../components/Metadata/MetaTitle"

interface NewProps {
    baseURL: string
}

const New = ({ baseURL }: NewProps) => {
    const { t, lang } = useTranslation("new")

    const [file, setFile] = useState<File | null>(null)
    const [asDataUrl, setAsDataUrl] = useState<string | null>(null)
    const [previewLoading, setPreviewLoading] = useState(false)

    const [title, setTitle] = useState("")
    const [tags, setTags] = useState<string[]>([])

    const [error, setError] = useState("")

    const [client, setClient] = useState<Client | null>(null)
    const router = useRouter()

    useEffect(() => {
        const client = new Client({
            baseURL,
        })

        client.loginBearer(Cookies.get("GIFBOX_TOKEN")!)

        setClient(client)
    }, [])

    const acceptFile = (file: File) => {
        setFile(file)
        setPreviewLoading(true)

        const data = new FileReader()

        data.addEventListener("load", () => {
            setAsDataUrl(data.result as string)
            setPreviewLoading(false)
        })

        data.readAsDataURL(file)
    }

    const upload = async () => {
        setError("")
        setPreviewLoading(true)
        try {
            const post = await client?.post.createPost(
                title,
                tags,
                file! as any as never // FIXME: typing issue in gifbox.js
            )!
            router.push(`/view/${post._id}-${post.slug}`, undefined, {
                locale: lang,
            })
        } catch (e: any) {
            const errorText = e?.response?.data?.error ?? String(e)
            setError(errorText)
            setPreviewLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center py-28 text-center">
            <MetaTitle>{t("common:pages.new")}</MetaTitle>
            <img
                alt="404"
                src={Illustration.src}
                className="pointer-events-none w-32 drop-shadow-xl"
            />
            <h1 className="mt-12 bg-gradient-to-l from-pink-500 to-indigo-500 bg-clip-text pb-4 text-2xl font-black text-transparent sm:text-3xl lg:text-6xl">
                {t("heading")}
            </h1>
            <p className="mt-4">{t("subheading")}</p>
            <div className="py-5">
                <FileButton acceptFile={acceptFile} accept="image/gif" />
            </div>
            {previewLoading ? (
                <Spinner />
            ) : (
                asDataUrl && (
                    <>
                        <img
                            alt={file?.name}
                            src={asDataUrl}
                            className="w-11/12 rounded-lg py-10 drop-shadow-xl sm:w-1/3 lg:w-1/4"
                        />
                        <GifUploadSettings
                            title={title}
                            setTitle={setTitle}
                            tags={tags}
                            setTags={setTags}
                            upload={upload}
                        />
                        {error && (
                            <div className="mt-4 rounded bg-red-500 p-3 text-white drop-shadow-xl">
                                {error}
                            </div>
                        )}
                    </>
                )
            )}
        </div>
    )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const cookies = useCookie(ctx)

    if (!cookies.has("GIFBOX_TOKEN")) {
        redirect(ctx.res as NextApiResponse, 302, "/login")
        return {}
    }

    return {
        props: {
            baseURL: process.env.GIFBOX_API!,
        },
    }
}

export default New
