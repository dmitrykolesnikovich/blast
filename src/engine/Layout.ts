import {Container} from "pixi.js"
import {View} from "./View"
import {context} from "./Engine"

export class Layout {

    private views: View[] = []
    readonly container: Container = new Container()

    append(view: View) {
        this.container.addChild(view.container)
        this.views.push(view)
        resizeView(view)
        view.appended()
        if (context.loader.isCompleted) {
            view.focused()
        }
    }

    appendAt(index: number, view: View) {
        this.container.addChildAt(view.container, index)
        this.views.push(view)
        resizeView(view)
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
        this.appendAt(index, view)
    }

    remove(view: View) {
        this.container.removeChild(view.container)
        this.views.splice(this.views.indexOf(view), 1)
        view.removed()
    }

    clear() {
        this.container.removeChildren()
        this.views = []
    }

    resize() {
        this.views.forEach((view) => resizeView(view))
    }

    focus() {
        this.views.forEach((view) => view.focused())
    }

}

function resizeView(view: View) {
    const canvasWidth = window.innerWidth
    const canvasHeight = window.innerHeight
    const {width, height} = view.size

    const wratio: number = canvasWidth / width
    const hratio: number = canvasHeight / height
    if (wratio < hratio) {
        view.container.scale.set(wratio)
        view.container.position.set(0, (canvasHeight - height * wratio) / 2)
    } else {
        view.container.scale.set(hratio)
        view.container.position.set((canvasWidth - width * hratio) / 2, 0)
    }
}
