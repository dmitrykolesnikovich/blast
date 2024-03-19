import {NineSlicePlane, Texture} from "pixi.js"
import {context, View} from '../src/engine'
import bradPng from "./brad.png"

export default function nineSlicePlaneExample() {
    const plane: NineSlicePlane = new NineSlicePlane(Texture.from(bradPng), 350, 250, 350, 250)
    plane.position.x = 225
    plane.position.y = 400
    plane.height = 1100
    plane.pivot.x = plane.width / 2
    plane.pivot.y = plane.height / 2
    plane.scale.set(0.6)

    context.layout.append(new class extends View {
        constructor() {
            super({width: 450, height: 800})
            this.layout = {
                plane
            }
        }
    }())

    document.onkeydown = (event) => {
        if (event.code == "ArrowRight") plane.width++
        if (event.code == "ArrowLeft") plane.width--
        if (event.code == "ArrowUp") plane.height++
        if (event.code == "ArrowDown") plane.height--
    }

}