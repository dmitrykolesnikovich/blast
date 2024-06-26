import {Container, ISize} from "pixi.js"
import {View} from "./View"
import {context} from "./Engine"

export class Layout {

    readonly _resizeBox: Container = new Container()
    private views: View[] = []

    append(view: View): View {
        this._resizeBox.addChild(view._resizeBox)
        this.views.push(view)

        this.resizeView(view)
        view.appended()
        return view
    }

    appendAt(view: View, index: number): View {
        this._resizeBox.addChildAt(view._resizeBox, index)
        this.views.push(view)

        this.resizeView(view)
        view.appended()
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
