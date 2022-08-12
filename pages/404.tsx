import type { NextPage } from "next"
import Illustration from "../assets/illustrations/404.svg"
import useTranslation from "next-translate/useTranslation"
import MetaTitle from "../components/Metadata/MetaTitle"

const PNF: NextPage = () => {
    const { t, lang } = useTranslation("common")

    return (
        <>
            <MetaTitle>{t("error_pages.not_found.title")}</MetaTitle>
            <div className="flex flex-col items-center justify-center py-28 text-center">
                <img
                    alt="404"
                    src={Illustration.src}
                    className="pointer-events-none w-11/12 drop-shadow-xl sm:w-1/3 lg:w-1/4"
                />
                <h1 className="mt-12 bg-gradient-to-r from-indigo-500 to-pink-600 bg-clip-text pb-4 text-2xl font-black text-transparent sm:text-4xl lg:text-6xl">
                    {t("error_pages.not_found.title")}
                </h1>
                <p className="mt-4 text-gray-500">
                    {t("error_pages.not_found.subtitle")}
                </p>
            </div>
        </>
    )
}

export default PNF
