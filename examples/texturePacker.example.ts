import {context, TODO, View} from "../src/engine"
import {Sprite} from "pixi.js"

export default function texturePackerExample() {
    const sprite: Sprite = TODO()

    context.layout.append(new class extends View {
        constructor() {
            super({width: 450, height: 800})
            this.layout = {
                sprite
            }
        }
    }())
}
