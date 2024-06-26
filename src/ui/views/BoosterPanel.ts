import {Container, IPointData, ISize} from "pixi.js"
import {panelCoins} from "../../features/ninePatch"
import Image from "./Image"
import {Booster} from "../../types/Booster"
import {
    boosterColorBombPng,
    boosterDynamitePng,
    boosterHorizontalBombPng,
    boosterVerticalBombPng,
    buttonBoosterPng, iconResetPng
} from "../../../res"

export type BoosterPanelLayout = {
    position: IPointData
    size: ISize
    booster: Booster
}

export class BoosterPanel extends Container {

    readonly layout: BoosterPanelLayout
    readonly icon: Image
    readonly price: Container

    constructor(layout: BoosterPanelLayout) {
        super()
        const {position, size, booster} = this.layout = layout
        this.position = position
        this.addChild(new Image({
            position: {x: 0, y: 0},
            anchor: {x: 0.5, y: 0.5},
            size: size,
            foreground: buttonBoosterPng,
        }))
        this.price = this.addChild(panelCoins({
            position: {x: 8, y: 36},
            size: {width: 72, height: 40},
            scale: 1.05,
        }))
        this.icon = this.addChild(new Image({
            position: {x: 0, y: 0},
            anchor: {x: 0.5, y: 0.7},
            size: {width: size.width * 0.9, height: size.height * 0.9},
            foreground: resolveBoosterIcon(booster),
        }))
    }

    set enabled(enabled: boolean) {
        this.eventMode = enabled ? 'static' : 'none'
        this.icon.foregroundContainer.alpha = enabled ? 1 : 0.35
    }

}

function resolveBoosterIcon(booster: Booster): string {
    switch (booster) {
        case "vertical":
            return boosterVerticalBombPng
        case "horizontal":
            return boosterHorizontalBombPng
        case "dynamite":
            return boosterDynamitePng
        case 'reset':
            return boosterColorBombPng
        case 'mix':
            return iconResetPng
    }
}
