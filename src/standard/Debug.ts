import {Environment} from "./Environment"

export function enableDebug() {
    Environment.isDebugEnabled = true
    window.addEventListener('keypress', (event) => {
        if (event.key == 'd') {
            Environment.isDebugEnabled = !Environment.isDebugEnabled
        }
    })
}

export function debug(message: string) {
    if (Environment.isDebugEnabled) {
        console.log(message)
    }
}
