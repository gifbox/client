interface ErrorProps {
    children: React.ReactNode
}

const Error = ({ children }: ErrorProps) => {
    return <div className="my-2 mb-4 font-bold text-red-500">{children}</div>
}

export default Error
