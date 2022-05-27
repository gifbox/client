import Link from "next/link"
import LogoColor from "../../assets/logos/logo-color.svg"
import useTranslation from "next-translate/useTranslation"
import { AccountButtons } from "./AccountButtons"

interface NavLinkProps {
    to: string
    lang: string
    children: React.ReactNode
}

const NavLink = ({ to, lang, children }: NavLinkProps) => {
    return (
        <Link href={to} lang={lang}>
            <a className="transition-all hover:font-black hover:text-blue-500 dark:hover:text-blue-400">
                {children}
            </a>
        </Link>
    )
}

const Navbar = () => {
    const { t, lang } = useTranslation("common")

    return (
        <>
            <nav className="fixed z-10 flex w-screen flex-row justify-between bg-white py-3 dark:bg-slate-900">
                <div className="flex flex-row items-center gap-6 pl-4">
                    <img src={LogoColor.src} className="h-10" />
                    <NavLink to="/" lang={lang}>
                        {t("pages.home")}
                    </NavLink>
                </div>
                <div className="pr-4">
                    <AccountButtons />
                </div>
            </nav>
            <div className="block" style={{ minHeight: 80 }}></div>
        </>
    )
}

export default Navbar
