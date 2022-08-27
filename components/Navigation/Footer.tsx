import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import FooterLogo from "./FooterLogo"

interface FooterCategoryProps {
    children: React.ReactNode
    name: string
}

const FooterCategory = ({ children, name }: FooterCategoryProps) => {
    return (
        <div className="block">
            <h3 className="pb-2 font-bold text-blue-500">{name}</h3>
            <div className="flex flex-col gap-1">{children}</div>
        </div>
    )
}

interface FooterLinkProps {
    children: React.ReactNode
    href: string
}

const FooterLink = ({ children, href }: FooterLinkProps) => {
    return (
        <Link href={href}>
            <a className="transition-colors hover:text-blue-500">{children}</a>
        </Link>
    )
}

const Footer = () => {
    const { t } = useTranslation("common")

    return (
        <>
            <footer className="mt-16 flex flex-col justify-between p-0 md:flex-row">
                <FooterLogo />
                <div className="flex flex-col gap-8 p-3 md:flex-row md:pr-10">
                    <FooterCategory name={t("footer.categories.legal")}>
                        <FooterLink href="https://revolt.chat/terms">
                            {t("footer.legal.terms")}
                        </FooterLink>
                        <FooterLink href="https://revolt.chat/privacy">
                            {t("footer.legal.privacy")}
                        </FooterLink>
                        <FooterLink href="https://revolt.chat/aup">
                            {t("footer.legal.aup")}
                        </FooterLink>
                    </FooterCategory>
                    <FooterCategory name={t("footer.categories.links")}>
                        <FooterLink href="https://rvlt.gg/gifbox">
                            {t("footer.links.revolt")}
                        </FooterLink>
                        <FooterLink href="https://github.com/gifbox">
                            {t("footer.links.github")}
                        </FooterLink>
                        <FooterLink href="https://support.revolt.chat/contact">
                            {t("footer.links.contact")}
                        </FooterLink>
                    </FooterCategory>
                </div>
            </footer>
        </>
    )
}

export default Footer
