import {Container} from "pixi.js"
import {View} from "./View"
import {context} from "./Engine"

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
        const canvasWidth = window.innerWidth
        const canvasHeight = window.innerHeight
        const {width, height} = view.size

        const wratio: number = canvasWidth / width
        const hratio: number = canvasHeight / height
        if (wratio < hratio) {
            view._resizeBox.scale.set(wratio)
            view._resizeBox.position.set(0, (canvasHeight - height * wratio) / 2)
        } else {
            view._resizeBox.scale.set(hratio)
            view._resizeBox.position.set((canvasWidth - width * hratio) / 2, 0)
        }
    }

}
