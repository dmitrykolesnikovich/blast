import {View} from "../engine"
import {Popup, popup} from "../features/ninePatch"
import Button from "./views/Button"
import Image from "./views/Image"
import Label from "./views/Label"
import {buttonRectangleBluePng, buttonRectangleRedPng, buttonRectangleShadowPng, coins1Png, life1Png} from "../../res"
import Navigation from "../features/navigation"

type Layout = {
    popup: Popup
    info: Label
    ok: Button
}

export default class HelpDialog extends View<Layout> {

    constructor(navigation: Navigation) {
        super({width: 450, height: 800})
        this.layout = {
            popup: popup({
                position: {x: 225, y: 420},
                size: {width: 440, height: 320},
                title: "How to Play",
                close: () => navigation.hideDialog(this),
            }),
            info: new Label({
                position: {x: 225, y: 380},
                anchor: {x: 0.5, y: 0.5},
                style: {
                    fontSize: 16,
                    fill: 0x15B8E5,
                    align: 'center',
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                    wordWrap: true,
                    wordWrapWidth: 220,
                },
                text: "I have some video for you."
            }),
            ok: new Button({
                position: {x: 225, y: 450},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 160, height: 57.63},
                foreground: buttonRectangleBluePng,
                background: buttonRectangleShadowPng,
                backgroundSize: {width: 175, height: 75.7},
                backgroundAnchor: {x: 0.49, y: 0.48},
                click: () => {
                    window.open("https://www.youtube.com/watch?v=AuN6T_C5HPE", "_blank")
                    navigation.hideDialog(this)
                },
                tint: 0x0F0813,
                label: new Label({
                    position: {x: 0, y: 0},
                    anchor: {x: 0.5, y: 0.5},
                    text: "Watch",
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
            }),
        }
    }

}
