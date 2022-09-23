import { Client } from "gifbox.js"
import Cookies from "js-cookie"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { genSessionName, W3C_EMAIL_REX } from "../../../lib/browser"
import { useAppState } from "../../../lib/useAppState"
import Error from "../../UI/Error"
import FormSubmit from "../../UI/FormSubmit"
import TextInput from "../../UI/TextInput"

interface LoginValues {
    email: string
    password: string
}

const LoginForm = observer(() => {
    const { t } = useTranslation("user")
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginValues>()

    const [loginError, setLoginError] = useState<string | null>(null)

    const state = useAppState()
    const router = useRouter()

    const doLogin = async ({ email, password }: LoginValues) => {
        setLoginError(null)

        const client = new Client({
            baseURL: state.environment.apiUrl,
        })

        const sessionName = genSessionName()

        try {
            await client.createSession(email, password, sessionName)
        } catch (e: any) {
            setLoginError(e?.response?.data?.error ?? String(e))
            return
        }

        state.updateClientUser(client.clientUser!)

        Cookies.set("GIFBOX_TOKEN", client.token!)

        router.push("/")
    }

    return (
        <form
            onSubmit={handleSubmit(doLogin)}
            onChange={() => setLoginError(null)}
        >
            <h1 className="font-header text-2xl font-bold">
                {t("common:login")}
            </h1>

            <TextInput
                label={t("email")}
                {...register("email", {
                    required: true,
                    pattern: W3C_EMAIL_REX,
                })}
            />
            {errors.email && <Error>{t("validation.error.email")}</Error>}

            <TextInput
                type="password"
                label={t("password")}
                {...register("password", {
                    required: true,
                    minLength: 8,
                })}
            />
            {errors.password && <Error>{t("validation.error.password")}</Error>}

            <FormSubmit variant="primary">{t("common:login")}</FormSubmit>
            {loginError && <Error>{loginError}</Error>}
        </form>
    )
})

export default LoginForm
