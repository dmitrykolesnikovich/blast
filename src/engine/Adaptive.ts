import {Container, IPointData, ISize} from "pixi.js"
import {Direction, isMobile, Orientation} from "./Library"

export interface AdaptiveElement {
    adaptElement(size: ISize): void
}

export function isAdaptiveElement(object: any): object is AdaptiveElement {
    return 'adaptElement' in object
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

export class AdaptiveContainer extends Container {

    readonly layout: Adaptive
    readonly content: Container = this.addChild(new Container())

    constructor(layout: Adaptive) {
        super()
        this.layout = layout
    }

}

export function setupAdaptiveContainerLayout(container: Container & { layout: Adaptive }, options: { size: ISize, fill?: Orientation, gravity?: Direction }, ...sync: AdaptiveContainer[]) {
    if (!isMobile()) return // quickfix todo make it configurable
    const {size, fill, gravity} = options
    const {layout} = container

    // fill
    const contentRatio: number = layout.contentRatio()
    switch (fill) {
        case "horizontal": {
            if (container.mask !== null) {
                container.width = size.width * container.width / (container.mask as Container).width / container.scale.x
                container.height = container.width / contentRatio
            } else {
                container.width = size.width
                container.height = container.width / contentRatio
            }
            break
        }
        case "vertical":
            container.height = size.height
            container.width = container.height * contentRatio
            break
    }

    // center
    const layoutRatio: number = layout.size.width / layout.size.height
    let layoutWidth: number
    let layoutHeight: number
    switch (fill) {
        case "horizontal": {
            layoutWidth = size.width
            layoutHeight = layoutWidth / layoutRatio
            break
        }
        case "vertical":
            layoutHeight = size.height
            layoutWidth = layoutHeight * layoutRatio
            break
        default: {
            layoutWidth = layout.size.width
            layoutHeight = layout.size.height
            break
        }
    }
    container.position.copyFrom(layout.position)
    const dx: number = (layoutWidth - layout.size.width) / 2
    const dy: number = (layoutHeight - layout.size.height) / 2
    container.x -= dx
    container.y -= dy

    // gravity
    switch (gravity) {
        case "down": {
            if (container.height > size.height) {
                container.y -= dy
            }
            break
        }
        case "up": {
            if (container.height > size.height) {
                container.y += dy
            }
            break
        }
        case "left": {
            if (container.height > size.height) {
                container.x -= dx
            }
            break
        }
        case "right": {
            if (container.height > size.height) {
                container.x += dx
            }
            break
        }
    }

    // sync
    sync.forEach(it => {
        it.position.copyFrom(container.position)
        it.scale.copyFrom(container.scale)
    })
}
