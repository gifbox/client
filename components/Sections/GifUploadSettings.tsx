import useTranslation from "next-translate/useTranslation"
import Button from "../UI/Button"
import TagField from "../UI/TagField"
import TextInput from "../UI/TextInput"

interface GifUploadSettingsProps {
    title: string
    setTitle: (value: string) => void
    tags: string[]
    setTags: (value: string[]) => void
    upload: () => void
}

const GifUploadSettings = ({
    title,
    setTitle,
    tags,
    setTags,
    upload,
}: GifUploadSettingsProps) => {
    const { t } = useTranslation("new")

    return (
        <div className="block w-11/12 md:grid md:w-4/6 md:grid-cols-1 md:gap-5 xl:w-2/6">
            <div className="block w-full">
                <TextInput
                    className="w-full"
                    label={t("title")}
                    value={title}
                    onChange={(e) => setTitle((e.target as any).value)}
                />
            </div>
            <div className="block w-full">
                <TagField
                    label={t("tags.section")}
                    hint={t("tags.remove_hint")}
                    tags={tags}
                    setTags={setTags}
                />
                <Button variant="primary" className="mt-4" onClick={upload}>
                    {t("upload")}
                </Button>
            </div>
        </div>
    )
}

export default GifUploadSettings
