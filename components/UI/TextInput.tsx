type TextInputProps = React.HTMLProps<HTMLInputElement>

const TextInput = ({ label, ...props }: TextInputProps) => {
    return (
        <div className="block py-3">
            {label && <label className="block pb-1.5 font-bold">{label}</label>}
            <input
                className={
                    "rounded border-none bg-gray-50 py-2 px-3 outline-none " +
                    "transition-colors focus:bg-gray-100 dark:bg-slate-800 " +
                    "dark:focus:bg-slate-700"
                }
                {...props}
            />
        </div>
    )
}

export default TextInput
