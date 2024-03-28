import {Application} from 'pixi.js'
import {Layout} from "./Layout"
import {Loader} from "./Loader"

export class Context {

    app: Application
    loader: Loader
    private _layout: Layout

    set layout(layout: Layout) {
        if (this._layout) {
            this.app.stage.removeChild(this._layout._resizeBox)
        }
        this._layout = layout
        this.app.stage.addChild(this._layout._resizeBox)
    }

    get layout(): Layout {
        return this._layout
    }

}
