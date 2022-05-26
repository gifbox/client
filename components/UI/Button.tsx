import { useRouter } from "next/router"
import useTranslation from "next-translate/useTranslation"

interface ButtonProps {
    children: React.ReactNode
    href?: string
    onClick?: () => void
    variant?: "primary" | "transparent" | "danger"
}

const Button = ({
    children,
    onClick,
    href,
    variant = "primary",
}: ButtonProps) => {
    const router = useRouter()
    const { lang } = useTranslation()

    const _onClick = () => {
        if (href) {
            router.push(href, undefined, {
                locale: lang,
            })
        } else if (onClick) {
            onClick()
        }
    }

    const variantClasses = () => {
        const outClasses = []

        switch (variant) {
            case "primary":
                outClasses.push("text-white", "bg-blue-500")
                break
            case "transparent":
                outClasses.push(
                    "text-black",
                    "dark:text-white",
                    "bg-transparent",
                    "hover:bg-gray-200",
                    "dark:hover:bg-slate-800"
                )
                break
            case "danger":
                outClasses.push("text-white", "bg-red-500")
                break
        }

        return outClasses.join(" ")
    }

    return (
        <button
            className={`cursor-pointer rounded border-none px-3 py-2 transition-all hover:brightness-105 active:brightness-110 ${variantClasses()}`}
            onClick={_onClick}
        >
            {children}
        </button>
    )
}

export default Button
