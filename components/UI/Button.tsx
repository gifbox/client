import { useRouter } from "next/router"
import useTranslation from "next-translate/useTranslation"
import React, { MouseEventHandler } from "react"

export type ButtonVariant = "primary" | "transparent" | "danger" | "disabled"

export const variantClasses = (variant: ButtonVariant, add: string) => {
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
        case "disabled":
            outClasses.push(
                "text-black",
                "dark:text-white",
                "bg-gray-300",
                "dark:bg-slate-800",
                "cursor-not-allowed"
            )
            break
    }

    outClasses.push(add)

    return outClasses.join(" ")
}

export const computeClasses = (variant: ButtonVariant, add: string = "") => {
    return `cursor-pointer rounded border-none px-3 py-2 transition-all hover:font-bold hover:brightness-105 active:brightness-110 ${variantClasses(
        variant,
        add
    )}`
}

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
    children: React.ReactNode
    href?: string
    onClick?: () => void
    variant?: ButtonVariant
    className?: string
}

const Button = ({
    children,
    onClick,
    href,
    variant = "primary",
    className,
    ...props
}: ButtonProps) => {
    const router = useRouter()
    const { lang } = useTranslation()

    const _onClick = () => {
        if (variant === "disabled") return

        if (href) {
            router.push(href, undefined, {
                locale: lang,
            })
        } else if (onClick) {
            onClick()
        }
    }

    return (
        <button
            className={computeClasses(variant, className)}
            onClick={_onClick}
            {...(props as React.HTMLAttributes<HTMLButtonElement>)}
        >
            {children}
        </button>
    )
}

export default Button
