import { KeyboardEvent, useState } from "react"
import Tag from "./Tag"

interface TagFieldProps {
    label?: string
    hint?: string
    tags: string[]
    setTags: (value: string[]) => void
}

const TagField = ({ label, hint, tags, setTags, ...props }: TagFieldProps) => {
    const [nextTag, setNextTag] = useState("")

    const acceptKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.code) {
            case "Enter":
            case "Space":
            case "Comma":
                if (nextTag.length === 0) return
                const tagsSet = new Set([...tags, nextTag.toLowerCase()]) // `Set`s auto-deduplicate
                setTags([...tagsSet])
                setNextTag("")
                break
            case "Backspace":
                if (nextTag.length !== 0) return
                removeTag(tags[tags.length - 1])
                break
        }
    }

    const removeTag = (tag: string) => {
        setTags(tags.filter((x) => x !== tag))
    }

    return (
        <div className="block py-3">
            {label && <label className="block pb-1.5 font-bold">{label}</label>}
            <div
                className={
                    "rounded border-none bg-gray-50 py-2 px-3 text-left outline-none " +
                    "transition-colors focus:bg-gray-100 dark:bg-slate-800 " +
                    "flex w-full resize-none flex-wrap gap-2 dark:focus:bg-slate-700"
                }
                {...props}
            >
                {tags.map((tag) => (
                    <Tag key={tag} onClick={() => removeTag(tag)}>
                        {tag}
                    </Tag>
                ))}
                <input
                    type="text"
                    className="flex-grow bg-transparent focus:outline-none"
                    value={nextTag}
                    onChange={(e) =>
                        setNextTag(e.target.value.trim().replace(/[,]/, ""))
                    }
                    onKeyDown={acceptKeyDown}
                />
            </div>
            {hint && (
                <small className="text-gray-400 dark:text-gray-700">
                    {hint}
                </small>
            )}
        </div>
    )
}

export default TagField
