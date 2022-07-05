import Button from "../UI/Button"
import Spinner from "../UI/Spinner"
import useTranslation from "next-translate/useTranslation"
import DefaultPfp from "../../assets/images/default-pfp.png"
import { observer } from "mobx-react-lite"
import { useAppState } from "../../lib/useAppState"

export const AccountButtons = observer(() => {
    const { t } = useTranslation("common")
    const state = useAppState()

    if (!state.finishedAutoLoadingUser) {
        return <Spinner />
    }

    if (state.clientUser !== null) {
        const avatarUrl = `${state.environment?.apiUrl}/file/avatars/${state.clientUser?.avatar?.fileName}`

        return (
            <Button
                variant="transparent"
                href="/account"
                className="flex items-center gap-3"
            >
                <img
                    src={
                        state.clientUser?.avatar !== null
                            ? avatarUrl
                            : DefaultPfp.src
                    }
                    className="h-6 w-6 rounded-full object-cover"
                />
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
