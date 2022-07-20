import { CheckCircle } from "@styled-icons/boxicons-solid"
import { Client } from "gifbox.js"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useAppState } from "../../lib/useAppState"
import Button from "../UI/Button"
import Spinner from "../UI/Spinner"
import TextField from "../UI/TextField"
import TextInput from "../UI/TextInput"

interface AccountDataSettingsProps {
    gifboxClient: Client
}

const AccountDataSettings = observer(
    ({ gifboxClient }: AccountDataSettingsProps) => {
        const { t } = useTranslation("user")
        const state = useAppState()

        if (!state.clientUser) {
            return <Spinner />
        }

        const [displayName, setDisplayName] = useState(
            state.clientUser.displayName
        )
        const [description, setDescription] = useState(
            state.clientUser.description
        )

        const displayNameChanged = displayName !== state.clientUser.displayName
        const descriptionChanged = description !== state.clientUser.displayName
        const anyChanged = descriptionChanged || displayNameChanged

        const updateData = () => {
            gifboxClient
                .modifySelf({
                    displayName,
                    description,
                })
                .then(() => {
                    state.updateClientUser(gifboxClient.clientUser!)
                    toast(t("saved"), {
                        icon: <CheckCircle size={20} />,
                    })
                })
        }

        return (
            <div className="block gap-5 md:grid md:grid-cols-2 xl:grid-cols-3">
                <div className="block w-full">
                    <TextInput
                        className="w-full"
                        value={state.clientUser.username}
                        readOnly={true}
                        label={t("username")}
                    />
                </div>
                <div className="block w-full">
                    <TextInput
                        className="w-full"
                        value={state.clientUser.email}
                        readOnly={true}
                        label={t("email")}
                    />
                </div>
                <div className="block w-full">
                    <TextInput
                        className="w-full"
                        value={displayName}
                        onChange={(e) =>
                            setDisplayName((e.target as any).value)
                        }
                        label={t("displayname")}
                    />
                </div>
                <div className="col-span-2 block w-full xl:col-span-3">
                    <TextField
                        label={t("description")}
                        value={description}
                        onChange={(e) =>
                            setDescription((e.target as any).value)
                        }
                    />
                    <Button
                        variant={anyChanged ? "primary" : "disabled"}
                        onClick={updateData}
                    >
                        {t("customize.set")}
                    </Button>
                </div>
            </div>
        )
    }
)

export default AccountDataSettings
