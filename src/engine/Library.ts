import {ISize} from "pixi.js"

export function isMobile(): boolean {
    const userAgent: string = window.navigator.userAgent.toLowerCase()
    return userAgent.includes("mobi") || userAgent.includes("tab") || userAgent.includes("ios") || userAgent.includes("android")
}

export function resolveOrientation(): Orientation {
    return window.innerWidth > window.innerHeight ? "horizontal" : "vertical"
}

export function range(begin: number, end: number): number[] {
    return [...Array(Math.abs(end - begin) + 1).keys()].map(index => begin + Math.sign(end - begin) * index)
}

export function enumerate<T>(array: T[]): [number, T][] {
    return array.map((element, index) => [index, element])
}

export function isHtmlElementVisible(htmlElement: HTMLElement) {
    return htmlElement.offsetParent !== null
}

export function TODO(message?: string): any {
    if (message !== undefined) {
        throw new Error(`TODO: ${message}`)
    } else {
        throw new Error('TODO')
    }
}

export function check(description: string, predicate: boolean) {
    if (!predicate) {
        throw new Error(description)
    }
}

export function checkSize(size: ISize, range: { min?: ISize, max?: ISize }) {
    if (range.min) {
        if (size.width < range.min.width) throw new Error(`${size.width} < ${range.min.width}`)
        if (size.height < range.min.height) throw new Error(`${size.height} < ${range.min.height}`)
    }
    if (range.max) {
        if (size.width > range.max.width) throw new Error(`${size.width} > ${range.max.width}`)
        if (size.height > range.max.height) throw new Error(`${size.height} > ${range.max.height}`)
    }
}

export type Orientation = 'horizontal' | 'vertical'

export type Direction = 'left' | 'right' | 'up' | 'down'

export function padLeft(text: any, length: number, prefix: string = ' '): string {
    const textLength: number = text.toString().length
    return `${prefix.repeat(length - textLength)}${text}`
}
