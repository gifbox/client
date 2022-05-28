import { useEffect, useState } from "react"
import Button from "../UI/Button"
import Spinner from "../UI/Spinner"
import useTranslation from "next-translate/useTranslation"
import Cookies from "js-cookie"

export const AccountButtons = () => {
    const { t } = useTranslation("common")
    const [hasLoaded, setHasLoaded] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        setIsLoggedIn(!!Cookies.get("GIFBOX_TOKEN"))
        setHasLoaded(true)
    })

    if (!hasLoaded) {
        return <Spinner />
    }

    if (isLoggedIn) {
        return (
            <Button variant="transparent" href="/account">
                {t("account")}
            </Button>
        )
    }

    return (
        <div className="flex flex-row items-center gap-3">
            <Button href="/register">{t("register")}</Button>
            <Button href="/login" variant="transparent">
                {t("login")}
            </Button>
        </div>
    )
}
