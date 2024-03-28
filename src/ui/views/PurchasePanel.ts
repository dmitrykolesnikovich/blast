import {Container, IPointData, ISize} from "pixi.js"
import Image from "./Image"
import Label from "./Label"
import Button from "./Button"
import {
    buttonRectangleGreenSmallPng,
    coins2Png,
    coins3Png,
    coins4Png,
    coins5Png,
    coins6Png,
    panelListPng
} from "../../../res"

type PurchasePanelIndex = 2 | 3 | 4 | 5 | 6

type PurchasePanelLayout = {
    position: IPointData
    size: ISize
    index: PurchasePanelIndex
}

export default class PurchasePanel extends Container {

    constructor(layout: PurchasePanelLayout) {
        super()
        const {position, size, index} = layout
        this.position = position

        this.addChild(new Image({
            position: {x: 0, y: 0},
            anchor: {x: 0.5, y: 0.5},
            foreground: panelListPng,
            size: size,
        }))
        const image: Image = this.addChild(new Image({
            position: {x: -size.width / 2, y: 0},
            anchor: {x: 0.18, y: 0.5},
            foreground: coinsImage(index),
            size: {width: 109.2, height: 65},
        }))
        this.addChild(new Label({
            position: {x: -20, y: 0},
            anchor: {x: 0.5, y: 0.5},
            text: price(index) + "",
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
        this.addChild(new Button({
            position: {x: size.width / 2 - 112.5 / 2 - 8, y: 0},
            anchor: {x: 0.5, y: 0.5},
            size: {width: 112.5, height: 50},
            foreground: buttonRectangleGreenSmallPng,
            label: new Label({
                position: {x: 0, y: 0},
                anchor: {x: 0.5, y: 0.5},
                text: "$5,99",
                style: {
                    fontSize: 20,
                    fill: 'white',
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                    dropShadow: true,
                    dropShadowAngle: 0.8,
                    dropShadowDistance: 1,
                }
            })
        }))

        // quickfix todo improve
        image.width *= 1.2
        image.height *= 1.2
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

function price(index: PurchasePanelIndex): number {
    switch (index) {
        case 2:
            return 150
        case 3:
            return 400
        case 4:
            return 950
        case 5:
            return 1200
        case 6:
            return 3600
    }
}