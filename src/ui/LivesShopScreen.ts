import {View} from "../engine"
import Image from "./views/Image"
import {paneInfo, popup1} from "../features/ninePatch"
import Label from "./views/Label"
import Button from "./views/Button"
import Life from "./views/Life"
import {
    buttonRectangleBluePng,
    buttonRectangleShadowPng,
    coins1Png,
    life1Png,
    life3Png,
} from "../../res"
import {Container} from "pixi.js"

type Layout = {
    background: Image
    panelAlert1: Container
    panelInfo: Container
    descriptionIcon: Image
    description: Label
    buttonRectangleBlue: Button
    life1: Life
    life2: Life
    life3: Life
    life4: Life
    life5: Life
    nextLifeDescription: Label
    nextLife: Label
}

export default class LivesShopScreen extends View<Layout> {
    constructor() {
        super({width: 450, height: 800})
        this.layout = {
            background: new Image({
                position: {x: 225, y: 150},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 220, height: 160},
                foreground: life1Png,
                angle: -14.32,
            }),
            panelAlert1: popup1({
                position: {x: 225, y: 400},
                size: {width: 450, height: 490},
            }),
            panelInfo: paneInfo({
                position: {x: 225, y: 340},
                size: {width: 300, height: 170},
            }),
            descriptionIcon: new Image({
                position: {x: 145, y: 340},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 115, height: 121},
                foreground: life3Png
            }),
            description: new Label({
                position: {x: 280, y: 300},
                anchor: {x: 0.5, y: 0.5},
                text: "Refill a\nfull set of lives",
                style: {
                    fontSize: 20,
                    fill: 0x15B8E5,
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                    align: "center",
                    wordWrap: true,
                    wordWrapWidth: 150,
                }
            }),
            buttonRectangleBlue: new Button({
                position: {x: 280, y: 370},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 160, height: 57.63},
                foreground: buttonRectangleBluePng,
                background: buttonRectangleShadowPng,
                backgroundSize: {width: 175, height: 75.7},
                backgroundAnchor: {x: 0.49, y: 0.48},
                tint: 0x0F0813,
                label: new Label({
                    position: {x: 0, y: 0},
                    anchor: {x: 0, y: 0.5},
                    text: "100",
                    style: {
                        fontSize: 32,
                        fill: 'white',
                        align: 'left',
                        fontFamily: 'fredokaOne',
                        fontWeight: '400',
                        dropShadow: true,
                        dropShadowAngle: 0.5,
                        dropShadowDistance: 2,
                        dropShadowBlur: 2,
                    }
                }),
                icons: [
                    new Image({
                        position: {x: -12, y: 0},
                        anchor: {x: 1, y: 0.5},
                        size: {width: 42.8, height: 44},
                        foreground: coins1Png,
                    })
                ]
            }),
            life1: new Life({
                position: {x: 115, y: 460},
                size: {width: 56, height: 40.922},
            }),
            life2: new Life({
                position: {x: 170, y: 460},
                size: {width: 56, height: 40.922},
            }),
            life3: new Life({
                position: {x: 225, y: 460},
                size: {width: 56, height: 40.922},
            }),
            life4: new Life({
                position: {x: 280, y: 460},
                size: {width: 56, height: 40.922},
            }),
            life5: new Life({
                position: {x: 335, y: 460},
                size: {width: 56, height: 40.922},
            }),
            nextLifeDescription: new Label({
                position: {x: 110, y: 500},
                style: {
                    fontSize: 28,
                    fill: 0x15B8E5,
                    align: 'left',
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                    dropShadow: true,
                    dropShadowAngle: 1.7,
                    dropShadowDistance: 0.88,
                },
                text: "Next life in:"
            }),
            nextLife: new Label({
                position: {x: 280, y: 500},
                style: {
                    fontSize: 28,
                    fill: 0xFF4C5E,
                    align: 'left',
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                },
                text: "FULL"
            }),

        }
    }
}