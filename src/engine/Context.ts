import {Application} from 'pixi.js'
import {Layout} from "./Layout"
import {Loader} from "./Loader"

export class Context {

    app: Application
    loader: Loader
    private _layout: Layout

    set layout(layout: Layout) {
        if (this._layout) {
            this.app.stage.removeChild(this._layout.container)
        }
        this._layout = layout
        this.app.stage.addChildAt(this._layout.container, 0)
    }

    get layout(): Layout {
        return this._layout
    }

}
