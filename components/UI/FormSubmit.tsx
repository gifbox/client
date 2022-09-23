import { ButtonVariant, computeClasses } from "./Button"

type FormSubmitProps = React.HTMLAttributes<HTMLInputElement> & {
    children: string
    variant: ButtonVariant
}

const FormSubmit = ({ children, variant, ...props }: FormSubmitProps) => {
    return (
        <input
            type="submit"
            className={computeClasses(variant)}
            value={children}
            {...(props as React.HTMLAttributes<HTMLInputElement>)}
        />
    )
}

export default FormSubmit
