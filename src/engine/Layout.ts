import {Container, ISize} from "pixi.js"
import {View} from "./View"
import {context} from "./Engine"
import {Adaptive, Direction, isAdaptive, Orientation, AdaptiveElement} from "./Library"

export class Layout {

    readonly root: Container = new Container()
    private views: View[] = []

    append(view: View): View {
        this.root.addChild(view._resizeBox)
        this.views.push(view)

        this.resizeView(view)
        view.appended()
        if (context.loader.isCompleted) {
            view.focused()
        }
        return view
    }

    appendAt(view: View, index: number): View {
        this.root.addChildAt(view._resizeBox, index)
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
        this.root.removeChild(view._resizeBox)
        this.views.splice(this.views.indexOf(view), 1)

        view.removed()
    }

    clear() {
        this.root.removeChildren()
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
        view.content.children.forEach(child => {
            if (isAdaptive(child)) {
                child.adaptElement(size)
            }
        })
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

export function setupContainerAdaptiveLayout(container: Container & { layout: Adaptive }, options: { size: ISize, fill?: Orientation, gravity?: Direction }) {
    const {size, fill, gravity} = options

    // fill content
    const contentRatio: number = container.layout.contentRatio()
    switch (fill) {
        case "horizontal": {
            container.width = size.width
            container.height = container.width / contentRatio
            break
        }
        case "vertical":
            container.height = size.height
            container.width = container.height * contentRatio
            break
    }

    // center layout
    const layoutRatio: number = container.layout.size.width / container.layout.size.height
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
            layoutWidth = container.layout.size.width
            layoutHeight = container.layout.size.height
            break
        }
    }
    container.position.copyFrom(container.layout.position)
    const dx: number = (layoutWidth - container.layout.size.width) / 2
    const dy: number = (layoutHeight - container.layout.size.height) / 2
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
}
