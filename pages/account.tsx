import type { NextPage } from "next"
import useTranslation from "next-translate/useTranslation"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Client, ClientUser } from "gifbox.js"
import Spinner from "../components/UI/Spinner"
import Button from "../components/UI/Button"
import Trans from "next-translate/Trans"

interface AccountProps {
    baseURL: string
}

const Account = ({ baseURL }: AccountProps) => {
    const { t, lang } = useTranslation("user")
    const [isLoading, setIsLoading] = useState(true)
    const [self, setSelf] = useState<ClientUser>()
    const [client, setClient] = useState<Client | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (!Cookies.get("GIFBOX_TOKEN"))
            router.push("/login", undefined, { locale: lang })

        const client = new Client({
            baseURL,
        })

        setClient(client)

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
        client?.logout().then(() => {
            Cookies.remove("GIFBOX_TOKEN")
            router.push("/login", undefined, { locale: lang })
        })
    }

    if (isLoading || !self) {
        return (
            <div className="flex h-72 items-center justify-center">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="mx-auto w-11/12 md:w-4/5 xl:w-3/4">
            <h1 className="mt-12 pb-4 text-4xl font-black lg:text-6xl">
                {t("hello", { name: self.displayName })}
            </h1>
            <div className="block py-2">
                <h2 className="py-3 text-2xl font-bold">
                    {t("log_out.generic")}
                </h2>
                <Trans
                    i18nKey="user:log_out.hint"
                    components={[
                        <p className="block pb-3 text-gray-800 dark:text-gray-300" />,
                        <a
                            href="#sessions"
                            className="font-bold text-blue-500"
                        />,
                    ]}
                />
                <Button variant="danger" onClick={logOut}>
                    {t("log_out.action")}
                </Button>
            </div>
            <div className="block py-2">
                <h2 className="py-3 text-2xl font-bold">
                    {t("legal.heading")}
                </h2>
                <h3 className="pb-3 text-xl font-bold">
                    {t("legal.gdpr_delete.heading")}
                </h3>
                <Trans
                    i18nKey="user:legal.gdpr_delete.manual"
                    components={[
                        <p className="block pb-3 text-gray-800 dark:text-gray-300" />,
                        <a
                            href="mailto:XX?subject=Request%20regarding%20the%20right%20to%20be%20forgotten"
                            className="font-bold text-blue-500"
                        />,
                        <span className="font-bold" />,
                    ]}
                    values={{
                        data_handler:
                            "INTENTIONALLY LEFT BLANK IN DEVELOPMENT PHASE",
                    }}
                />
                <h3 className="pb-3 text-xl font-bold">
                    {t("legal.gdpr_checkout.heading")}
                </h3>
                <Trans
                    i18nKey="user:legal.gdpr_checkout.manual"
                    components={[
                        <p className="block pb-3 text-gray-800 dark:text-gray-300" />,
                        <a
                            href="mailto:XX?subject=Request%20regarding%20the%20right%20to%20data%20portability"
                            className="font-bold text-blue-500"
                        />,
                    ]}
                    values={{
                        data_handler:
                            "INTENTIONALLY LEFT BLANK IN DEVELOPMENT PHASE",
                    }}
                />
            </div>
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
