import Button from "../UI/Button"
import Spinner from "../UI/Spinner"
import useTranslation from "next-translate/useTranslation"
import { observer } from "mobx-react-lite"
import { useAppState } from "../../lib/useAppState"

export const AccountButtons = observer(() => {
    const { t } = useTranslation("common")
    const state = useAppState()

    if (!state.finishedAutoLoadingUser) {
        return <Spinner />
    }

    if (state.clientUser !== null) {
        return (
            <Button variant="transparent" href="/account">
                {state.clientUser?.displayName}
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
})
