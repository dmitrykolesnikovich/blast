import {Container, IPointData, ISize} from "pixi.js"
import Image from "./Image"
import {buttonColored} from "../../features/ninePatch"
import Label from "./Label"
import {
    coins2Png,
    coins3Png,
    coins4Png,
    coins5Png,
    coins6Png,
    panelListPng
} from "../../../res"

type PurchasePanelIndex = 2 | 3 | 4 | 5 | 6

type PurchasePanelOptions = {
    position: IPointData
    size: ISize // {width: 450, height: 100}
    index: PurchasePanelIndex
}

export default class PurchasePanel extends Container {

    constructor(options: PurchasePanelOptions) {
        super()
        const {position, size, index} = options
        this.position = position

        this.addChild(new Image({
            position: {x: 0, y: 0},
            anchor: {x: 0.5, y: 0.5},
            foreground: panelListPng,
            size: size,
        }))
        this.addChild(new Image({
            position: {x: -size.width / 2, y: 0},
            anchor: {x: 0.5, y: 0.5},
            foreground: coinsImage(index),
            size: {width: 357, height: 212},
        }))
        this.addChild(new Label({
            position: {x: 0, y: 0},
            anchor: {x: 0.5, y: 0.5},
            text: "950",
            style: {
                fontSize: 20,
                fill: 0x15B8E5,
                fontFamily: 'fredokaOne',
                fontWeight: '400',
                align: "center",
                wordWrap: true,
                wordWrapWidth: 150,
            }
        }))
        this.addChild(buttonColored('green', {
            position: {x: size.width / 2, y: 0},
            anchor: {x: 0.5, y: 0.5},
            size: {width: 40, height: 40},
        }))
    }

}

function coinsImage(index: PurchasePanelIndex): string {
    switch (index) {
        case 2:
            return coins2Png
        case 3:
            return coins3Png
        case 4:
            return coins4Png
        case 5:
            return coins5Png
        case 6:
            return coins6Png
    }
}
