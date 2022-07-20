import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useState } from "react"

type SearchBarProps = {
    className?: string
} & React.HTMLProps<HTMLInputElement>

export const SearchField = ({ className, ...props }: SearchBarProps) => {
    return (
        <input
            className={
                "rounded border-none bg-gray-50 py-2 px-3 outline-none " +
                "transition-colors focus:bg-gray-100 dark:bg-slate-800 " +
                "resize dark:focus:bg-slate-700 " +
                (className ?? "")
            }
            {...props}
        />
    )
}

const SearchBar = (props: SearchBarProps) => {
    const { t, lang } = useTranslation("common")
    const router = useRouter()

    const [query, setQuery] = useState("")

    const updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!query?.trim().length) return

        switch (e.key) {
            case "Enter":
                const urlQuery = encodeURIComponent(query)
                    .trim()
                    .replaceAll("%20", "+")
                await router.push(`/search?q=${urlQuery}`, undefined, {
                    locale: lang,
                })
                break
        }
    }

    return (
        <SearchField
            placeholder={t("search")}
            onChange={updateQuery}
            onKeyPress={handleKeyPress}
            value={query}
            {...props}
        />
    )
}

export default SearchBar
