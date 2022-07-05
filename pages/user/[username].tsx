import type { GetServerSidePropsContext } from "next"
import useTranslation from "next-translate/useTranslation"
import { Client, Responses } from "gifbox.js"
import DefaultPfp from "../../assets/images/default-pfp.png"
import { CheckCircle } from "@styled-icons/boxicons-solid"
import Head from "next/head"
import PNF from "../404"

interface ViewProps {
    error?: string
    apiUrl?: string
    data?: Responses.UserQueryResponse
}

const View = ({ apiUrl, error, data }: ViewProps) => {
    const { t, lang } = useTranslation("user")

    if (error?.toLowerCase().includes("not found")) {
        return <PNF />
    }

    const avatarUrl = `${apiUrl}/file/avatars/${data?.avatar?.fileName}`

    const openAvatar = () => {
        window.open(avatarUrl, "_blank")
    }

    return (
        <>
            <Head>
                {data?.avatar !== null && (
                    <>
                        <meta property="og:image" content={avatarUrl} />
                    </>
                )}
            </Head>
            <div className="mx-auto w-11/12 md:w-4/5 xl:w-3/4">
                {error ? (
                    <div className="rounded-lg bg-pink-200 p-4 text-center dark:bg-pink-900">
                        <h1 className="text-4xl font-black">{error}</h1>
                        <p className="dark:text-gray-300">
                            {t("common:try_again")}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 xl:flex-row xl:gap-28">
                        <div className="mb-4 flex flex-col">
                            <div className="w-full xl:w-96">
                                <img
                                    src={
                                        data?.avatar !== null
                                            ? avatarUrl
                                            : DefaultPfp.src
                                    }
                                    className="aspect-square cursor-pointer rounded-full object-cover drop-shadow-none transition-all hover:drop-shadow-xl"
                                    onClick={openAvatar}
                                />
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-1">
                            <h1 className="text-3xl font-black xl:text-4xl">
                                {data?.displayName}
                                {data?.verified && (
                                    <span className="ml-1.5 mb-1 text-blue-500">
                                        <CheckCircle size={36} />
                                    </span>
                                )}
                            </h1>
                            <h2 className="mb-4 text-xl font-normal text-gray-400 dark:text-slate-500">
                                @{data?.username}
                            </h2>
                            <p className="mb-4 font-normal text-gray-700 dark:text-slate-300">
                                {data?.description}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const username = ctx.params!.username as string

    const client = new Client({
        baseURL: process.env.GIFBOX_API!,
    })

    try {
        const user: Responses.UserQueryResponse = await client.user.query(
            username
        )

        return {
            props: {
                apiUrl: process.env.GIFBOX_API!,
                data: user,
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
