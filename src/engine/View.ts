import {Container, Graphics, ISize} from "pixi.js"
import {Controller} from "./Controller"
import {isAdaptiveElement} from "./Adaptive"

export interface ViewListener {
    init(controller: Controller): void
    update(controller: Controller): void
}

export function isViewListener(listener: any): listener is ViewListener {
    return 'init' in listener && 'update' in listener
}

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

    initListeners(controller: Controller) {
        this.content.children.forEach(it => {
            if (isViewListener(it)) {
                it.init(controller)
            }
        })
    }

    update(controller: Controller) {
        // no op
    }

    updateListeners(controller: Controller) {
        this.content.children.forEach(it => {
            if (isViewListener(it)) {
                it.update(controller)
            }
        })
    }

    appended() {
        // no op
    }

    removed() {
        // no op
    }

    focused(controller: Controller) {
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
            if (isAdaptiveElement(child)) {
                child.adaptElement(size)
            }
        })
    }

    enableMask() {
        const {width, height} = this.size
        this.content.mask = this.content.addChild(new Graphics().beginFill(0xffffff).drawRect(0, 0, width, height).endFill())
    }

    disableMask() {
        this.content.mask = null
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
