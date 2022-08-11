const nextTranslate = require("next-translate")

/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    output: "standalone",
}

module.exports = nextTranslate(config)
