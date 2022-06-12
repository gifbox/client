import { CloudUpload } from "@styled-icons/boxicons-solid"
import { ChangeEvent, useRef, useState } from "react"

interface FileButtonProps {
    acceptFile: (file: File) => void
    accept?: string
}

const FileButton = ({ acceptFile, accept }: FileButtonProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const [currentFileName, setCurrentFileName] = useState<string | null>(null)

    const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (!files?.length) return

        const file = files[0]

        setCurrentFileName(file.name)
        acceptFile(file)
    }

    const selectFile = () => {
        inputRef.current?.click()
    }

    return (
        <>
            <input
                type="file"
                className="hidden"
                accept={accept}
                ref={inputRef}
                onChange={fileSelected}
            ></input>
            <button
                onClick={selectFile}
                className="flex cursor-pointer items-center gap-2 rounded border-none bg-blue-500 px-3 py-2 text-white transition-all hover:font-bold hover:brightness-105 active:brightness-110"
            >
                <CloudUpload size={30} />
                {currentFileName ?? "Select"}
            </button>
        </>
    )
}

export default FileButton
