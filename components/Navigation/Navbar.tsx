import Link from "next/link"
import LogoColor from "../../assets/logos/logo-color.svg"
import useTranslation from "next-translate/useTranslation"
import { AccountButtons } from "./AccountButtons"
import { Menu } from "@styled-icons/boxicons-regular"
import React, { useState } from "react"
import { useRouter } from "next/router"
import SearchBar from "../UI/SearchBar"

interface NavLinkProps {
    to: string
    lang: string
    hideBar?: (val: boolean) => void
    children: React.ReactNode
}

const NavLink = ({ to, lang, children, hideBar }: NavLinkProps) => {
    const setFalse = () => {
        if (hideBar) hideBar(false)
    }

    return (
        <Link href={to} lang={lang}>
            <a
                className="transition-all md:hover:font-black md:hover:text-blue-500 md:dark:hover:text-blue-400"
                onClick={setFalse}
            >
                {children}
            </a>
        </Link>
    )
}

interface NavbarPagesProps {
    hideBar?: (val: boolean) => void
}

const NavbarPages = ({ hideBar }: NavbarPagesProps) => {
    const { t, lang } = useTranslation("common")

    return (
        <>
            <NavLink to="/" lang={lang} hideBar={hideBar}>
                {t("pages.home")}
            </NavLink>
            <NavLink to="/new" lang={lang} hideBar={hideBar}>
                {t("pages.new")}
            </NavLink>
        </>
    )
}

const Navbar = () => {
    const [showExtendedMobile, setShowExtendedMobile] = useState(false)
    const { lang } = useTranslation()
    const router = useRouter()

    const goToMain = () => {
        router.push("/", undefined, {
            locale: lang,
        })
    }

    return (
        <>
            <nav className="fixed z-10 hidden w-screen flex-row justify-between bg-white py-3 dark:bg-slate-900 md:flex">
                <div className="flex flex-row items-center gap-6 pl-4">
                    <img
                        src={LogoColor.src}
                        className="h-10"
                        onClick={goToMain}
                    />
                    <NavbarPages />
                </div>
                <SearchBar />
                <div className="pr-4">
                    <AccountButtons />
                </div>
            </nav>
            <nav className="fixed z-10 w-screen bg-white py-3 dark:bg-slate-900 md:hidden">
                <div className="flex flex-row items-center justify-between">
                    <div className="pl-4">
                        <img
                            src={LogoColor.src}
                            className="h-10"
                            onClick={goToMain}
                        />
                    </div>
                    <div
                        className="pr-4 text-gray-500 dark:text-slate-300"
                        onClick={() =>
                            setShowExtendedMobile(!showExtendedMobile)
                        }
                    >
                        <Menu size={32} />
                    </div>
                </div>
                <aside
                    className={`${
                        showExtendedMobile ? "flex md:hidden" : "hidden"
                    } z-20 flex-col gap-3 p-4`}
                >
                    <AccountButtons />
                    <NavbarPages hideBar={setShowExtendedMobile} />
                </aside>
            </nav>
            <div className="block" style={{ minHeight: 80 }}></div>
        </>
    )
}

export default Navbar
