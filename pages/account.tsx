import type { NextPage } from "next"
import useTranslation from "next-translate/useTranslation"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Client, ClientUser } from "gifbox.js"
import Spinner from "../components/UI/Spinner"
import Button from "../components/UI/Button"

interface AccountProps {
    baseURL: string
}

const Account = ({ baseURL }: AccountProps) => {
    const { t, lang } = useTranslation("user")
    const [isLoading, setIsLoading] = useState(true)
    const [self, setSelf] = useState<ClientUser>()
    const router = useRouter()

    useEffect(() => {
        if (!Cookies.get("GIFBOX_TOKEN"))
            router.push("/login", undefined, { locale: lang })

        const client = new Client({
            baseURL,
        })

        client
            .loginBearer(Cookies.get("GIFBOX_TOKEN")!)
            .then(() => {
                setSelf(client.clientUser!)
                setIsLoading(false)
            })
            .catch(() => {
                router.push("/login", undefined, { locale: lang })
            })
    }, [])

    const logOut = () => {
        Cookies.remove("GIFBOX_TOKEN")
        router.push("/login", undefined, { locale: lang })
    }

    if (isLoading) {
        return (
            <div className="flex h-72 items-center justify-center">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="mx-auto w-11/12 md:w-4/5 xl:w-3/4">
            <h1 className="mt-12 pb-4 text-2xl font-black sm:text-4xl lg:text-6xl">
                {t("hello", { name: self?.displayName })}
            </h1>
            <Button variant="danger" onClick={logOut}>
                Log out
            </Button>
        </div>
    )
}

export async function getServerSideProps() {
    return {
        props: {
            baseURL: process.env.GIFBOX_API!,
        },
    }
}

export default Account
