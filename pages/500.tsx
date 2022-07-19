import type { NextPage } from "next"
import Illustration from "../assets/illustrations/no-such-gif.svg"
import useTranslation from "next-translate/useTranslation"

const ISE: NextPage = () => {
    const { t } = useTranslation("common")

    return (
        <div className="flex flex-col items-center justify-center py-28 text-center">
            <img
                alt="Internal Server Error"
                src={Illustration.src}
                className="pointer-events-none w-24"
            />
            <h1 className="mt-4 bg-gradient-to-r from-indigo-500 to-pink-600 bg-clip-text pb-4 text-2xl font-black text-transparent sm:text-4xl lg:text-6xl">
                500 / Internal Server Error
            </h1>
            <p className="mt-4 text-gray-500">{t("error_pages.internal")}</p>
        </div>
    )
}

export default ISE
