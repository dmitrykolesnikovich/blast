import {Container, ISize} from "pixi.js"
import {Controller} from "./Controller"

export class View<Layout extends Object = {}> {

    readonly container: Container = new Container()
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
                this.container.addChild(object)
            }
        })
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

}
