import Image from "./views/Image"
import {View} from "../engine"
import {Container} from "pixi.js"
import {popup2} from "../features/ninePatch"
import Label from "./views/Label"
import Button from "./views/Button"
import {
    buttonCircleGreenPng,
    buttonCircleRedPng,
    iconLevelPng,
    iconNextPng,
    iconRepeatPng,
    panelAlert2Png,
    panelFlagBluePng, panelFlagGreyPng,
    panelHeadlineDarkPng,
    particlesShinePng,
    particlesShineRadial1Png,
    particlesShineRadial2Png,
    starBigGreyPng,
    starBigYellowPng
} from "../../res"

type Layout = {
    particlesShineRadial1: Image
    particlesShineRadial2: Image
    panelAlert2: Container
    panelHeadlineDark: Image
    scoreDescription: Label
    score: Label
    panelFlagBlue: Image
    menu: Button
    repeat: Button
    next: Button
}

export default class WinScreen extends View<Layout> {

    constructor() {
        super({width: 450, height: 800})
        this.layout = {
            particlesShineRadial1: new Image({
                position: {x: 225, y: 240},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 900, height: 900},
                foreground: particlesShineRadial1Png
            }),
            particlesShineRadial2: new Image({
                position: {x: 225, y: 240},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 900, height: 900},
                foreground: particlesShineRadial2Png
            }),
            panelAlert2: popup2({
                position: {x: 225, y: 350},
                size: {width: 400, height: 190},
            }),
            panelFlagBlue: new Image({
                position: {x: 225, y: 260},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 300, height: 70},
                foreground: panelFlagBluePng,
                label: new Label({
                    position: {x: 0, y: -10},
                    anchor: {x: 0.5, y: 0.5},
                    text: "Completed!",
                    style: {
                        fontSize: 36,
                        fill: 0xffeb00,
                        fontFamily: 'fredokaOne',
                        fontWeight: '400',
                        align: "center",
                    }
                })
            }),
            panelHeadlineDark: new Image({
                position: {x: 225, y: 320},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 120, height: 44.94},
                foreground: panelHeadlineDarkPng,
                label: new Label({
                    position: {x: 0, y: 0},
                    anchor: {x: 0.5, y: 0.5},
                    text: "Level 10",
                    style: {
                        fontSize: 32,
                        fill: 'white',
                        align: 'left',
                        fontFamily: 'fredokaOne',
                        fontWeight: '400',
                    }
                })
            }),
            scoreDescription: new Label({
                position: {x: 225 + 18, y: 370},
                anchor: {x: 1, y: 0.5},
                text: "Your Score:",
                style: {
                    fontSize: 24,
                    fill: 0x1A9DCA,
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                    align: "center",
                }
            }),
            score: new Label({
                position: {x: 225 + 32, y: 370},
                anchor: {x: 0, y: 0.5},
                text: "1220",
                style: {
                    fontSize: 24,
                    fill: 0xff4258,
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                    align: "center",
                }
            }),
            menu: new Button({
                position: {x: 135, y: 455},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 32, height: 32},
                foreground: iconLevelPng,
                background: buttonCircleRedPng,
                backgroundSize: {width: 64, height: 64}
            }),
            repeat: new Button({
                position: {x: 225, y: 455},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 32, height: 32},
                foreground: iconRepeatPng,
                background: buttonCircleGreenPng,
                backgroundSize: {width: 64, height: 64}
            }),
            next: new Button({
                position: {x: 315, y: 455},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 32, height: 32},
                foreground: iconNextPng,
                background: buttonCircleGreenPng,
                backgroundSize: {width: 64, height: 64}
            }),

        }
    }

}