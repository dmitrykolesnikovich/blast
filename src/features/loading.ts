import {Loader} from "../engine"

export function setupLoader(loader: Loader) {
    const loaderIndicator: HTMLElement | null = document.querySelector("#loader-indicator")
    if (loaderIndicator !== null) {
        loaderIndicator.style.width = `0%`
        loader.progressListeners.push((progress: number) => {
            loaderIndicator.style.width = `${progress * 100}%`
        })
    }
}