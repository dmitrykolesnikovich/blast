import {Container, IPointData, ISize} from "pixi.js"
import {stopSoundEffect} from "./Audio"

export function range(begin: number, end: number): number[] {
    return [...Array(end - begin + 1).keys()].map(i => i + begin)
}

export function enumerate<T>(array: T[]): [number, T][] {
    return array.map((element, index) => [index, element])
}

export function isHtmlElementVisible(htmlElement: HTMLElement) {
    return htmlElement.offsetParent !== null
}

export function TODO(message: string): any {
    throw new Error(`TODO: ${message}`)
}

export function check(predicate: boolean) {
    if (!predicate) {
        throw new Error("check")
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

export interface AdaptiveElement {
    adaptElement(size: ISize): void
}

// https://stackoverflow.com/a/14426274/909169
export function isAdaptive(element: any): element is AdaptiveElement {
    return 'adaptElement' in element
}

export type Adaptive<T = { position: IPointData, size: ISize }> = T & { contentRatio: () => number }

export function adapt<T extends { size: ISize }>(layout: T, container?: Container): Adaptive<T> {
    let _contentRatio: number | undefined
    const contentRatio = () => {
        if (_contentRatio === undefined) {
            if (container !== undefined) {
                _contentRatio = container.width / container.height
            } else {
                _contentRatio = layout.size.width / layout.size.height
            }
        }
        return _contentRatio
    }

    return {
        ...layout,
        contentRatio
    }
}
