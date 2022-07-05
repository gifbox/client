import { createContext, ReactNode, useContext } from "react"
import { AppState } from "./state"

let appState: AppState

const initAppState = (): AppState => {
    const _appState = appState ?? new AppState()

    // SSR: Return a fresh app state
    if (typeof window === "undefined") return _appState

    // CSR: Create an app state _once_
    if (!appState) appState = _appState

    return _appState
}

export const AppStateContext = createContext<AppState>(null!)
export const AppStateProvider = ({ children }: { children: ReactNode }) => {
    const appState = initAppState()

    return (
        <AppStateContext.Provider value={appState}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppState = () => {
    const state = useContext(AppStateContext)
    if (!state) {
        throw new Error("useAppState must be used within a AppStateProvider")
    }
    return state
}
