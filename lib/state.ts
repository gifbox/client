import { Client, ClientUser } from "gifbox.js"
import Cookies from "js-cookie"
import { makeAutoObservable } from "mobx"
import { enableStaticRendering } from "mobx-react-lite"
import { getAPIUrl, getDataHandlerEmail } from "./environment"
import { GifboxEnvironment } from "./types"

enableStaticRendering(typeof window === "undefined")

export class AppState {
    environment: GifboxEnvironment = { apiUrl: "", dataHandlerEmail: "" }
    clientUser: ClientUser | null = null

    /**
     * This is used to track if we finished auto-loading the current client user via cookies.
     * This prevents UI jumps becaue of the logged-out state being visible for a short time.
     */
    finishedAutoLoadingUser: boolean = false

    constructor() {
        makeAutoObservable(this)

        this.fetchEnvironment().then(async () => {
            if (Cookies.get("GIFBOX_TOKEN")) {
                await this.initUser()
            }

            this.setFinishedAutoLoadingUser(true)
        })
    }

    private async fetchEnvironment() {
        if (typeof window === "undefined") {
            // SSR: Fetch directly from environment variables
            this.updateEnvironment({
                apiUrl: getAPIUrl(),
                dataHandlerEmail: getDataHandlerEmail(),
            })
        } else {
            // CSR: Fetch using environment API
            const request = await fetch("/api/environment")
            const json = (await request.json()) as GifboxEnvironment
            this.updateEnvironment(json)
        }
    }

    private async initUser() {
        const gbClient = new Client({
            baseURL: this.environment.apiUrl,
        })
        await gbClient.loginBearer(Cookies.get("GIFBOX_TOKEN")!)
        this.updateClientUser(gbClient.clientUser!)
    }

    updateEnvironment(environment: GifboxEnvironment) {
        this.environment = environment
    }

    updateClientUser(user: ClientUser) {
        this.clientUser = user
    }

    setFinishedAutoLoadingUser(hasFinished: boolean) {
        this.finishedAutoLoadingUser = hasFinished
    }
}
