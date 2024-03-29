import {Container, Graphics, ISize} from "pixi.js"
import {Controller} from "./Controller"
import {isAdaptive} from "./Library"

export class View<Layout extends Object = {}> {

    readonly _resizeBox: Container = new Container()
    readonly content: Container = this._resizeBox.addChild(new Container())
    private _layout: Layout
    readonly size: ISize
    isInitialized: boolean = false // todo make setter private

    constructor(size: ISize) {
        this.size = size
    }

    set layout(layout: Layout) {
        this._layout = layout
        Object.values(layout).forEach((object) => {
            if (object != null) {
                this.content.addChild(object)
            }
        })

        const canvasWidth: number = window.innerWidth
        const canvasHeight: number = window.innerHeight
        const size: ISize = {width: canvasWidth / this._resizeBox.scale.x, height: canvasHeight / this._resizeBox.scale.y}
        this.adaptElements(size)
    }

    get layout(): Layout {
        return this._layout
    }

    init(controller: Controller) {
        // no op
    }

    update(controller: Controller) {
        // no op
    }

    appended() {
        // no op
    }

    removed() {
        // no op
    }

    focused() {
        // no op
    }

    append(child: Container): View {
        this.content.addChild(child)
        return this
    }

    resize(size: ISize) {
        // no op
    }

    adaptElements(size: ISize) {
        this.content.children.forEach(child => {
            if (isAdaptive(child)) {
                child.adaptElement(size)
            }
        })
    }

}

export function viewOf(size: ISize, ...layout: Container[]): View {
    return new class extends View {
        constructor() {
            super(size)
            this.layout = Object.fromEntries(layout.map(container => [0, container]))
        }
    }()
}