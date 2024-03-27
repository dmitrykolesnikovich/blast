import {clearAnimations, View} from "../engine"
import Image from "./views/Image"
import {buttonColored, Popup, popup} from "../features/ninePatch"
import {Container} from "pixi.js"
import Button from "./views/Button"
import Label from "./views/Label"
import panel from "./views/Panel"
import {
    lifeBrokenPng,
    lifeBrokenShadowPng
} from "../../res"
import Navigation from "../features/navigation"
import {animateHeartBeat} from "../features/animations"

type Layout = {
    popup: Popup
    life: Container
    description: Label
    quit: Button
    play: Button
}

export default class QuitDialog extends View<Layout> {

    constructor(navigation: Navigation) {
        super({width: 450, height: 800})
        this.layout = {
            popup: popup({
                position: {x: 225, y: 400},
                size: {width: 400, height: 500},
                title: "Quit Level",
                close: () => navigation.hideDialog(this),
            }),
            life: panel({
                position: {x: 225, y: 330},
                items: [
                    new Image({
                        anchor: {x: 0.5, y: 0.5},
                        size: {width: 273.6, height: 248.8},
                        foreground: lifeBrokenShadowPng,
                        tint: 0x0F0813,
                        alpha: 0.5,
                    }),
                    new Image({
                        anchor: {x: 0.5, y: 0.5},
                        size: {width: 180, height: 148.4},
                        foreground: lifeBrokenPng,
                    }),
                ]
            }),
            description: new Label({
                position: {x: 225, y: 440},
                anchor: {x: 0.5, y: 0.5},
                text: "Do you really want to quit\nthe level?",
                style: {
                    fontSize: 18,
                    fill: 0x1A9DCA,
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                    align: "center",
                }
            }),
            quit: buttonColored('pink', {
                position: {x: 150, y: 520},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 110, height: 44},
                label: new Label({
                    position: {x: 0, y: 0},
                    anchor: {x: 0.5, y: 0.5},
                    text: "Quit",
                    style: {
                        fontSize: 22,
                        fill: 'white',
                        align: 'left',
                        fontFamily: 'fredokaOne',
                        fontWeight: '400',
                    }
                }),
                click: () => navigation.navigateLoseDialog()
            }),
            play: buttonColored('greenDark', {
                position: {x: 300, y: 520},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 110, height: 44},
                label: new Label({
                    position: {x: 0, y: 0},
                    anchor: {x: 0.5, y: 0.5},
                    text: "Play on",
                    style: {
                        fontSize: 22,
                        fill: 'white',
                        align: 'left',
                        fontFamily: 'fredokaOne',
                        fontWeight: '400',
                    }
                }),
                click: () => navigation.hideDialog(this),
            }),
        }
    }

    focused() {
        const {life} = this.layout
        animateHeartBeat(life)
    }

    removed() {
        const {life} = this.layout
        clearAnimations(life)
    }

}
