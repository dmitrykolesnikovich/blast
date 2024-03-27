import {View} from "../engine"
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
                scale: 0.8,
                items: [
                    new Image({
                        anchor: {x: 0.5, y: 0.5},
                        size: {width: 342, height: 311},
                        foreground: lifeBrokenShadowPng,
                        tint: 0x0F0813,
                        alpha: 0.5,
                    }),
                    new Image({
                        anchor: {x: 0.5, y: 0.5},
                        size: {width: 225, height: 185.5},
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
            }),
        }
    }

}
