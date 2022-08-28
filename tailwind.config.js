module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: ["var(--gbx-font-sans)", "system-ui", "sans-serif"],
            header: [
                "var(--gbx-font-header)",
                "var(--gbx-font-sans)",
                "system-ui",
                "sans-serif",
            ],
        },
    },
    plugins: [],
}
