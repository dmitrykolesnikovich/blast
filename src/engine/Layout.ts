import {Container, ISize} from "pixi.js"
import {View} from "./View"
import {context} from "./Engine"
import {Adaptive, AdaptiveContainer, Direction, Orientation} from "./Library"

export class Layout {

    readonly _resizeBox: Container = new Container()
    private views: View[] = []

    append(view: View): View {
        this._resizeBox.addChild(view._resizeBox)
        this.views.push(view)

        this.resizeView(view)
        view.appended()
        if (context.loader.isCompleted) {
            view.focused()
        }
        return view
    }

    appendAt(view: View, index: number): View {
        this._resizeBox.addChildAt(view._resizeBox, index)
        this.views.push(view)

        this.resizeView(view)
        view.appended()
        if (context.loader.isCompleted) {
            view.focused()
        }
        return view
    }

    replaceAt(index: number, view: View) {
        const viewToRemove: View | undefined = this.views[index]
        if (viewToRemove != undefined) {
            this.remove(viewToRemove)
        }
        this.appendAt(view, index)
    }

    remove(view: View) {
        this._resizeBox.removeChild(view._resizeBox)
        this.views.splice(this.views.indexOf(view), 1)

        view.removed()
    }

    clear() {
        this._resizeBox.removeChildren()
        this.views = []
    }

    resize() {
        this.views.forEach((view) => this.resizeView(view))
    }

    focus() {
        this.views.forEach((view) => view.focused())
    }

    getView(index: number): View {
        return this.views[index]
    }

    get size(): number {
        return this.views.length
    }

    /*internals*/

    private resizeView(view: View) {
        const canvasWidth: number = window.innerWidth
        const canvasHeight: number = window.innerHeight
        const canvasSize: ISize = {width: canvasWidth, height: canvasHeight}
        setupContainerLayout(view._resizeBox, canvasSize, view.size)
        const size: ISize = {width: canvasWidth / view._resizeBox.scale.x, height: canvasHeight / view._resizeBox.scale.y}
        view.resize(size)
        view.adaptElements(size)
    }

}

export function setupContainerLayout(container: Container, outer: ISize, inner: ISize) {
    const wratio: number = outer.width / inner.width
    const hratio: number = outer.height / inner.height
    if (wratio < hratio) {
        container.scale.set(wratio)
        container.position.set(0, (outer.height - inner.height * wratio) / 2)
    } else {
        container.scale.set(hratio)
        container.position.set((outer.width - inner.width * hratio) / 2, 0)
    }
}

export function setupAdaptiveContainerLayout(container: Container & {layout: Adaptive}, options: { size: ISize, fill?: Orientation, gravity?: Direction }, ...sync: AdaptiveContainer[]) {
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
