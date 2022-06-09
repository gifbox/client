import { Client } from "gifbox.js"
import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import Button from "../UI/Button"
import TextField from "../UI/TextField"
import TextInput from "../UI/TextInput"

interface AccountDataSettingsProps {
    gifboxClient: Client
    setCurrentUsername: (value: string) => void
}

const AccountDataSettings = ({
    gifboxClient,
    setCurrentUsername,
}: AccountDataSettingsProps) => {
    const { t } = useTranslation("user")

    const [displayName, setDisplayName] = useState(
        gifboxClient.clientUser?.displayName
    )
    const [description, setDescription] = useState(
        gifboxClient.clientUser?.description
    )

    const displayNameChanged =
        displayName !== gifboxClient.clientUser?.displayName
    const descriptionChanged =
        description !== gifboxClient.clientUser?.description
    const anyChanged = descriptionChanged || displayNameChanged

    const updateDescription = () => {
        gifboxClient
            .modifySelf({
                displayName,
                description,
            })
            .then(() => {
                setCurrentUsername(displayName!)
            })
    }

    return (
        <div className="block gap-5 md:grid md:grid-cols-2 xl:grid-cols-3">
            <div className="block w-full">
                <TextInput
                    className="w-full"
                    value={gifboxClient.clientUser?.username}
                    readOnly={true}
                    label={t("username")}
                />
            </div>
            <div className="block w-full">
                <TextInput
                    className="w-full"
                    value={gifboxClient.clientUser?.email}
                    readOnly={true}
                    label={t("email")}
                />
            </div>
            <div className="block w-full">
                <TextInput
                    className="w-full"
                    value={displayName}
                    onChange={(e) => setDisplayName((e.target as any).value)}
                    label={t("displayname")}
                />
            </div>
            <div className="col-span-2 block w-full xl:col-span-3">
                <TextField
                    label={t("description")}
                    value={description}
                    onChange={(e) => setDescription((e.target as any).value)}
                />
                <Button
                    variant={anyChanged ? "primary" : "disabled"}
                    onClick={updateDescription}
                >
                    {t("customize.set")}
                </Button>
            </div>
        </div>
    )
}

export default AccountDataSettings
