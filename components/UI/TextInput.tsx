import React from "react"

type TextInputProps = React.HTMLProps<HTMLInputElement>

const TextInput = React.forwardRef(
    ({ label, readOnly, className, ...props }: TextInputProps, ref) => {
        return (
            <div className="block py-3">
                {label && (
                    <label className="block pb-1.5 font-bold">{label}</label>
                )}
                <input
                    className={
                        "rounded border-none bg-gray-50 py-2 px-3 outline-none " +
                        "transition-colors focus:bg-gray-100 dark:bg-slate-800 " +
                        "resize dark:focus:bg-slate-700 " +
                        (readOnly ? "cursor-not-allowed opacity-70" : "") + // readOnly inputs are marked as such
                        ` ${className}` // Allow appending className instead of overwriting it
                    }
                    title={label ?? ""}
                    ref={ref as any}
                    readOnly={readOnly}
                    {...props}
                />
            </div>
        )
    }
)

export default TextInput
