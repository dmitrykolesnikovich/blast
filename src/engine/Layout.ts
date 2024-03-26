import {Container} from "pixi.js"
import {View} from "./View"
import {context} from "./Engine"
import {containerOf} from "./Pixi"

export class Layout {

    readonly root: Container = new Container()
    private readonly parents: WeakMap<View, Container> = new WeakMap()
    private views: View[] = []

    append(view: View) {
        const parent: Container = containerOf(view.container)
        this.root.addChild(parent)
        this.parents.set(view, parent)
        this.views.push(view)

        this.resizeView(view)
        view.appended()
        if (context.loader.isCompleted) {
            view.focused()
        }
    }

    appendAt(view: View, index: number) {
        const parent: Container = containerOf(view.container)
        this.root.addChildAt(parent, index)
        this.parents.set(view, parent)
        this.views.push(view)

        this.resizeView(view)
        view.appended()
        if (context.loader.isCompleted) {
            view.focused()
        }
    }

    replaceAt(index: number, view: View) {
        const viewToRemove: View | undefined = this.views[index]
        if (viewToRemove != undefined) {
            this.remove(viewToRemove)
        }
        this.appendAt(view, index)
    }

    remove(view: View) {
        const parent: Container = this.parents.get(view) as Container
        this.root.removeChild(parent)
        this.parents.delete(view)
        this.views.splice(this.views.indexOf(view), 1)

        view.removed()
    }

    clear() {
        this.root.removeChildren()
        for (let view of this.views) this.parents.delete(view)
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
        const parent: Container = this.parents.get(view) as Container
        const canvasWidth = window.innerWidth
        const canvasHeight = window.innerHeight
        const {width, height} = view.size

        const wratio: number = canvasWidth / width
        const hratio: number = canvasHeight / height
        if (wratio < hratio) {
            parent.scale.set(wratio)
            parent.position.set(0, (canvasHeight - height * wratio) / 2)
        } else {
            parent.scale.set(hratio)
            parent.position.set((canvasWidth - width * hratio) / 2, 0)
        }
    }

}
