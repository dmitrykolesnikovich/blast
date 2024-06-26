import {Loader} from "../engine"
import manifest from "../manifest"

export function setupLoader(loader: Loader) {
    const loaderIndicator: HTMLElement | null = document.querySelector("#loader-indicator")
    const appVersion: HTMLElement | null = document.querySelector("#app-version")
    if (loaderIndicator !== null) {
        loaderIndicator.style.width = `0%`
        loader.progressListeners.push((progress: number) => {
            loaderIndicator.style.width = `${progress * 100}%`
        })
    }
    if (appVersion !== null) {
        appVersion.textContent = `version ${manifest.version}`
    }
}