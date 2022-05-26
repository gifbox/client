import type { NextPage } from "next"
import Trans from "next-translate/Trans"
import useTranslation from "next-translate/useTranslation"
import { AccountButtons } from "../components/Navigation/AccountButtons"

const Home: NextPage = () => {
    const { t, lang } = useTranslation("home")

    return (
        <div className="mx-auto w-11/12 md:w-4/5 xl:w-3/4">
            <div className="w-full">
                <div className="flex flex-col items-center justify-center rounded-lg bg-blue-100 py-10 text-center dark:bg-slate-800">
                    <Trans
                        i18nKey="home:introduction.title"
                        components={[
                            <h1 className="text-6xl font-black" />,
                            <span className="text-blue-500" />,
                        ]}
                    />
                    <p className="mt-4 mb-8 text-xl text-gray-600 dark:text-slate-300">
                        {t("introduction.about")}
                    </p>
                    <AccountButtons />
                </div>
            </div>
        </div>
    )
}

export default Home
