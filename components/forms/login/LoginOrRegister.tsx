import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import PageTabs from "../../UI/PageTabs"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

interface AccountFormBox {
    children: React.ReactNode
}

const AccountFormBox = ({ children }: AccountFormBox) => {
    const { t } = useTranslation("user")

    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="block py-10">
                <h1 className="mt-4 bg-gradient-to-r from-indigo-500 to-pink-600 bg-clip-text pb-4 font-header text-2xl font-bold tracking-wide text-transparent sm:text-4xl lg:text-6xl">
                    {t("login_promo.heading")}
                </h1>
                <p className="text-gray-500">{t("login_promo.subtext")}</p>
            </div>
            <div className="block w-full py-10 px-4 md:w-auto md:px-10">
                {children}
            </div>
        </div>
    )
}

interface LoginOrRegisterProps {
    isRegister: boolean
}

const LoginOrRegister = ({ isRegister }: LoginOrRegisterProps) => {
    const { t } = useTranslation("common")
    const router = useRouter()

    return (
        <AccountFormBox>
            <PageTabs
                options={[
                    {
                        key: "register",
                        title: t("register"),
                    },
                    {
                        key: "login",
                        title: t("login"),
                    },
                ]}
                activeKey={isRegister ? "register" : "login"}
                onSwitch={(tab) => {
                    switch (tab.key) {
                        case "register":
                            router.push("/register")
                            break
                        case "login":
                            router.push("/login")
                            break
                    }
                }}
            />
            {isRegister ? <RegisterForm /> : <LoginForm />}
        </AccountFormBox>
    )
}

export default LoginOrRegister
