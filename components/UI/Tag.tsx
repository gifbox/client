type TagProps = {
    children: React.ReactNode
} & React.HTMLProps<HTMLAnchorElement>

const Tag = ({ children, ...props }: TagProps) => {
    return (
        <a
            className={
                "cursor-pointer select-none overflow-hidden rounded bg-blue-600 px-2 py-1 text-white " +
                "shadow-md shadow-transparent transition-all hover:bg-blue-600 hover:shadow-blue-300 " +
                "dark:bg-blue-900 dark:hover:bg-blue-700 dark:hover:shadow-blue-800"
            }
            {...props}
        >
            {children}
        </a>
    )
}

export default Tag
