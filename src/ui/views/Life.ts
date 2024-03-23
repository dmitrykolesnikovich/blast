import {Container, IPointData, ISize} from "pixi.js"
import Image from "./Image"
import {life1Png, life1ShadowPng} from "../../../res"

type LifeOptions = {
    position: IPointData
    size: ISize
}

export default class Life extends Container {

    constructor(options: LifeOptions) {
        super()
        const {position, size} = options
        this.position = position

        this.addChild(new Image({
            position: {x: 0, y: 1},
            anchor: {x: 0.5, y: 0.5},
            size: {width: size.width * 1.0538 * 1.55, height: size.height * 1.2579 * 1.55},
            foreground: life1ShadowPng,
            tint: 0x0F0813,
            alpha: 0.7
        }))
        this.addChild(new Image({
            position: {x: 0, y: 0},
            anchor: {x: 0.5, y: 0.5},
            // size: {width: 274, height: 239},
            // {width: 260, height: 190},
            size: size,
            foreground: life1Png,
        }))
    }

}