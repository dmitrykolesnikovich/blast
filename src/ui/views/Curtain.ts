import {View} from "../../engine"
import Navigation from "../../features/navigation"
import {Graphics} from "pixi.js"

export default class Curtain extends View {

    background: Graphics = new Graphics().beginFill('black').drawRect(-2000, -2000, 4000, 4000).endFill()

    constructor() {
        super({width: 450, height: 800})
        this.layout = {
            background: this.background
        }
    }

}
