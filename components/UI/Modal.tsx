import { X } from "@styled-icons/boxicons-regular"
import RoModal, { ModalProps } from "react-overlays/Modal"

const ModalBackdrop = () => {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-40 bg-gray-600 bg-opacity-70 backdrop-blur-sm dark:bg-gray-900 dark:bg-opacity-70"></div>
    )
}

interface ModalCloseButtonProps {
    hide: () => void
}

export const ModalCloseButton = ({ hide }: ModalCloseButtonProps) => {
    return (
        <span className="mb-4 flex justify-end text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200">
            <X size={30} onClick={hide} />
        </span>
    )
}

const Modal = (props: ModalProps) => {
    return (
        <RoModal
            className="fixed left-0 right-0 bottom-0 top-0 z-50 max-h-screen overflow-auto bg-white px-5 py-4 text-slate-900 outline-none dark:bg-slate-800 dark:text-white md:left-1/2 md:top-1/2 md:right-auto md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-lg"
            renderBackdrop={ModalBackdrop}
            {...props}
        >
            {props.children}
        </RoModal>
    )
}

export default Modal
