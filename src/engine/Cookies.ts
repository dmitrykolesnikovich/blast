export function setCookie(key: string, value: string | number | boolean, days: number = 365) {
    const date: Date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    const expires: string = "expires=" + date.toUTCString()
    document.cookie = key + "=" + value + "; " + expires + "; path=/"
}

export function getCookie(key: string, defaultValue: string): string {
    const prefix: string = key + "="
    const cookie: string = decodeURIComponent(document.cookie) //to be careful
    const tokens: string[] = cookie.split('; ')
    for (const token of tokens) {
        if (token.startsWith(prefix)) {
            return token.substring(prefix.length)
        }
    }
    return defaultValue
}
