import { Client } from "gifbox.js"
import { GetServerSidePropsContext, NextApiResponse } from "next"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import * as yup from "yup"
import Button from "../components/UI/Button"
import TextInput from "../components/UI/TextInput"
import UAParser from "ua-parser-js"
import { redirect } from "next/dist/server/api-utils"
import { useCookie } from "next-cookie"
import { useRouter } from "next/router"
import { useAppState } from "../lib/useAppState"
import { observer } from "mobx-react-lite"

interface RegisterProps {
    baseURL: string
    sessionName: string
}

const registerShape = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().min(3).max(50).not(["self"]).required(),
    password: yup.string().min(8).required(),
})

const Register = observer(({ baseURL, sessionName }: RegisterProps) => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()
    const state = useAppState()

    const { t, lang } = useTranslation("user")

    useEffect(() => {}, [])

    const isValid = () => {
        try {
            registerShape.validateSync({
                email,
                username,
                password,
            })
            return {
                valid: true,
                error: "",
            }
        } catch (e: any) {
            return {
                valid: false,
                error: String(e.message),
            }
        }
    }

    const register = async () => {
        setError("")

        const { valid, error } = isValid()
        if (!valid) return setError(error)

        const client = new Client({
            baseURL,
        })

        try {
            await client.user.register(username, email, password)
            await client.createSession(email, password, sessionName)

            state.updateClientUser(client.clientUser!)

            Cookies.set("GIFBOX_TOKEN", client.token!)

            router.push("/", undefined, {
                locale: lang,
            })
        } catch (e: any) {
            setError(e.response?.data?.error ?? e.message)
        }
    }

    return (
        <div className="flex h-full flex-col items-center justify-center py-28 text-center">
            <div className="block w-full rounded-lg py-10 px-4 shadow-black drop-shadow-xl md:w-auto md:bg-blue-100 md:px-10 md:dark:bg-gray-900">
                <h1 className="font-header text-2xl font-bold">
                    {t("common:register")}
                </h1>
                <TextInput
                    label={t("username")}
                    onChange={(e) => setUsername((e.target as any).value)}
                    value={username}
                />
                <TextInput
                    label={t("email")}
                    onChange={(e) => setEmail((e.target as any).value)}
                    value={email}
                />
                <TextInput
                    label={t("password")}
                    type="password"
                    onChange={(e) => setPassword((e.target as any).value)}
                    value={password}
                />
                <p className="mb-2 font-bold text-red-500">{error}</p>
                <div className="flex justify-center gap-2">
                    <Button variant="primary" onClick={register}>
                        {t("common:register")}
                    </Button>
                    <Button variant="transparent" href="/login">
                        {t("login_instead")}
                    </Button>
                </div>
            </div>
        </div>
    )
})

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const cookies = useCookie(ctx)

    if (cookies.has("GIFBOX_TOKEN")) {
        redirect(ctx.res as NextApiResponse, 302, "/")
        return {}
    }

    const gifboxClient = new Client({
        baseURL: process.env.GIFBOX_API!,
    })

    try {
        await gifboxClient.loginBearer(cookies.get("GIFBOX_TOKEN")!)
    } catch (e) {
        cookies.remove("GIFBOX_TOKEN")
    }

    const parser = UAParser(ctx.req.headers["user-agent"]?.toString())
    const sessionName = `${parser.os.name} ${parser.os.version} (${parser.browser.name})`

    return {
        props: {
            baseURL: process.env.GIFBOX_API!,
            sessionName,
        },
    }
}

export default Register
