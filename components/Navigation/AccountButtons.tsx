import { useEffect, useState } from "react"
import Button from "../UI/Button"
import Spinner from "../UI/Spinner"
import useTranslation from "next-translate/useTranslation"

export const AccountButtons = () => {
    const { t } = useTranslation("common")
    const [hasLoaded, setHasLoaded] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("gifboxToken"))
        setHasLoaded(true)
    })

    if (!hasLoaded) {
        return <Spinner />
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
