export function range(begin: number, end: number): number[] {
    return [...Array(end - begin + 1).keys()].map(i => i + begin)
}

export function isHtmlElementVisible(htmlElement: HTMLElement) {
    return htmlElement.offsetParent !== null
}

export function TODO(message?: string): any {
    throw new Error(`TODO: ${message}`)
}
