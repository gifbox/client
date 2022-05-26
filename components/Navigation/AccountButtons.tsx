import { useEffect, useState } from "react"
import Button from "../UI/Button"
import Spinner from "../UI/Spinner"

export const AccountButtons = () => {
    const [hasLoaded, setHasLoaded] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("gifboxToken"))
        setHasLoaded(true)
    })

    if (!hasLoaded) {
        return <Spinner />
    }

    return (
        <div className="flex flex-row items-center gap-3">
            <Button href="/login">Login</Button>
            <Button href="/register" variant="transparent">
                Register
            </Button>
        </div>
    )
}
