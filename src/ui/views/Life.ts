import {Container, IPointData, ISize} from "pixi.js"
import Image from "./Image"
import {life1GreyPng, life1Png, life1ShadowPng} from "../../../res"

type LifeLayout = {
    position: IPointData
    size: ISize
}

export default class Life extends Container {

    private readonly icon: Image

    constructor(layout: LifeLayout) {
        super()
        const {position, size} = layout
        this.position = position
        this.addChild(new Image({
            position: {x: 0, y: 1},
            anchor: {x: 0.5, y: 0.5},
            size: {width: size.width * 1.0538 * 1.55, height: size.height * 1.2579 * 1.55},
            foreground: life1ShadowPng,
            tint: 0x0F0813,
            alpha: 0.7
        }))
        this.icon = this.addChild(new Image({
            position: {x: 0, y: 0},
            anchor: {x: 0.5, y: 0.5},
            size: size,
        }))
    }

    set enabled(enabled: boolean) {
        this.icon.foreground = enabled ? life1Png : life1GreyPng
    }

}
