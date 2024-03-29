import type { NextPage } from "next"
import Illustration from "../assets/illustrations/no-such-gif.svg"
import useTranslation from "next-translate/useTranslation"
import MetaTitle from "../components/Metadata/MetaTitle"

const ISE: NextPage = () => {
    const { t } = useTranslation("common")

    return (
        <>
            <MetaTitle>{t("error_pages.internal")}</MetaTitle>
            <div className="flex flex-col items-center justify-center py-48 text-center">
                <img
                    alt="Internal Server Error"
                    src={Illustration.src}
                    className="pointer-events-none w-24"
                />
                <h1 className="mt-4 bg-gradient-to-r from-indigo-500 to-pink-600 bg-clip-text pb-4 font-header text-2xl font-bold tracking-wide text-transparent sm:text-4xl lg:text-6xl">
                    500 / Internal Server Error
                </h1>
                <p className="mt-4 text-gray-500">
                    {t("error_pages.internal")}
                </p>
            </div>
        </>
    )
}

export default ISE
