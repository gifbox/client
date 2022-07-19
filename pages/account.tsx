import useTranslation from "next-translate/useTranslation"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Client, ClientUser } from "gifbox.js"
import Spinner from "../components/UI/Spinner"
import Button from "../components/UI/Button"
import Trans from "next-translate/Trans"
import AccountDataSettings from "../components/Sections/AccountDataSettings"
import { observer } from "mobx-react-lite"
import { useAppState } from "../lib/useAppState"
import { RightArrowCircle } from "@styled-icons/boxicons-solid"
import { toast } from "react-hot-toast"
import {
    SessionCurrentResponse,
    SessionListResponse,
} from "gifbox.js/dist/types/Responses"

interface AccountProps {
    baseURL: string
    dataHandler: string
}

const Account = observer(({ baseURL, dataHandler }: AccountProps) => {
    const { t, lang } = useTranslation("user")
    const router = useRouter()
    const state = useAppState()

    const [isLoading, setIsLoading] = useState(true)
    const [self, setSelf] = useState<ClientUser>()
    const [client, setClient] = useState<Client | null>(null)
    const [currentUsername, setCurrentUsername] = useState<string>("")
    const [sessions, setSessions] = useState<SessionListResponse>()
    const [currentSession, setCurrentSession] =
        useState<SessionCurrentResponse>()

    useEffect(() => {
        if (!Cookies.get("GIFBOX_TOKEN"))
            router.push("/login", undefined, { locale: lang })

        const client = new Client({
            baseURL,
        })

        setClient(client)

        client
            .loginBearer(Cookies.get("GIFBOX_TOKEN")!)
            .then(async () => {
                setSelf(client.clientUser!)
                setCurrentUsername(client.clientUser?.displayName!)
                setIsLoading(false)

                const currentSession = await client.getCurrentSession()
                setCurrentSession(currentSession)
                const sessionList = await client.getSessions()
                setSessions(sessionList)
            })
            .catch(() => {
                router.push("/login", undefined, { locale: lang })
            })
    }, [])

    const logOut = () => {
        client?.logout().then(() => {
            state.updateClientUser(null!)
            Cookies.remove("GIFBOX_TOKEN")
            router.push("/login", undefined, { locale: lang })
        })
    }

    const logOutById = (sessionId: string) => {
        if (currentSession?._id === sessionId) return logOut()

        client?.deleteSession(sessionId)
        setSessions(sessions?.filter((x) => x._id !== sessionId))
    }

    const underConstruction = () => {
        toast(t("common:under_construction"), {
            position: "bottom-center",
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
                {t("hello", { name: currentUsername })}
            </h1>
            <div className="block py-2">
                <h2 className="py-3 text-2xl font-bold">
                    {t("customize.heading")}
                </h2>
                <AccountDataSettings
                    gifboxClient={client!}
                    setCurrentUsername={setCurrentUsername}
                />
            </div>
            <div className="block py-2">
                <h2 className="py-3 text-2xl font-bold" id="sessions">
                    {t("sessions.heading")}
                </h2>
                <div className="flex flex-col gap-3 pb-3">
                    {sessions?.map((session) => (
                        <div
                            className="flex w-full flex-col items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-slate-800 md:flex-row"
                            key={session._id}
                        >
                            <div className="block text-center md:text-left">
                                <h4 className="text-xl font-bold">
                                    {session.sessionName}
                                </h4>
                                <span className="inline text-sm font-normal opacity-50">
                                    {session._id}
                                </span>
                            </div>
                            <div className="flex w-full flex-col items-center gap-3 md:w-auto md:flex-row">
                                {session._id === currentSession?._id && (
                                    <span className="mt-4 flex flex-row items-center gap-1 font-normal text-green-700 dark:text-green-500 md:mt-0">
                                        <RightArrowCircle size={20} />{" "}
                                        {t("sessions.current")}
                                    </span>
                                )}
                                <Button
                                    variant="transparent"
                                    onClick={underConstruction}
                                >
                                    {t("sessions.rename")}
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => logOutById(session._id)}
                                >
                                    {t("log_out.generic")}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
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
                            href={`mailto:${dataHandler}?subject=Request%20regarding%20the%20right%20to%20be%20forgotten`}
                            className="font-bold text-blue-500"
                        />,
                        <span className="font-bold" />,
                    ]}
                    values={{
                        data_handler: state.environment.dataHandlerEmail,
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
                            href={`mailto:${dataHandler}?subject=Request%20regarding%20the%20right%20to%20data%20portability`}
                            className="font-bold text-blue-500"
                        />,
                    ]}
                    values={{
                        data_handler: dataHandler,
                    }}
                />
            </div>
        </div>
    )
})

export async function getServerSideProps() {
    return {
        props: {
            baseURL: process.env.GIFBOX_API!,
            dataHandler: process.env.GIFBOX_DATA_HANDLER_EMAIL!,
        },
    }
}

export default Account
