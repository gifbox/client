import { UAParser } from "ua-parser-js"

export const genSessionName = () => {
    const parser = UAParser(navigator.userAgent)
    return `${parser.os.name} ${parser.os.version} (${parser.browser.name})`
}

export const W3C_EMAIL_REX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
