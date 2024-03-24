import {View} from "../engine"
import Image from "./views/Image"
import {Container} from "pixi.js"
import {panelHeadLine, popup2} from "../features/ninePatch"
import Label from "./views/Label"
import Button from "./views/Button"
import {
    buttonCircleGreenPng,
    buttonCircleRedPng,
    cloudLosePng,
    iconLevelPng,
    iconRepeatPng,
    panelFlagGreyPng,
    particlesRainPng
} from "../../res"
import {rain} from "../features/particles"

type Layout = {
    panelFlagGrey: Image
    panelAlert2: Container
    panelHeadline: Container
    scoreDescription: Label
    score: Label
    goalDescription: Label
    goal: Label
    menu: Button
    repeat: Button
    particlesRain: Image
    cloudLose: Image
}

export default class LoseScreen extends View<Layout> {

    private readonly titleLevel: Label = new Label({
        position: {x: 70, y: 24},
        anchor: {x: 0.5, y: 0.5},
        style: {
            fontSize: 18,
            fill: 'white',
            fontFamily: 'fredokaOne',
            fontWeight: '400',
            align: "center",
        }
    })

    constructor() {
        super({width: 450, height: 800})
        this.layout = {
            panelFlagGrey: new Image({
                position: {x: 225, y: 320},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 300, height: 70},
                foreground: panelFlagGreyPng,
                label: new Label({
                    position: {x: 0, y: -10},
                    anchor: {x: 0.5, y: 0.5},
                    text: "Level Failed!",
                    style: {
                        fontSize: 36,
                        fill: 'white',
                        fontFamily: 'fredokaOne',
                        fontWeight: '400',
                        align: "center",
                    }
                })
            }),
            panelAlert2: popup2({
                position: {x: 225, y: 470},
                size: {width: 400, height: 200},
            }),
            panelHeadline: panelHeadLine({
                position: {x: 225, y: 372},
                size: {width: 140, height: 48},
                label: this.titleLevel
            }),
            scoreDescription: new Label({
                position: {x: 225 + 18, y: 430},
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
                position: {x: 225 + 32, y: 430},
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
            goalDescription: new Label({
                position: {x: 225 + 18, y: 480},
                anchor: {x: 1, y: 0.5},
                text: "Your Goal:",
                style: {
                    fontSize: 24,
                    fill: 0x1A9DCA,
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                    align: "center",
                }
            }),
            goal: new Label({
                position: {x: 225 + 32, y: 480},
                anchor: {x: 0, y: 0.5},
                text: "2000",
                style: {
                    fontSize: 24,
                    fill: 0xff4258,
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                    align: "center",
                }
            }),
            menu: new Button({
                position: {x: 180, y: 580},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 32, height: 32},
                foreground: iconLevelPng,
                background: buttonCircleRedPng,
                backgroundSize: {width: 64, height: 64}
            }),
            repeat: new Button({
                position: {x: 270, y: 580},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 32, height: 32},
                foreground: iconRepeatPng,
                background: buttonCircleGreenPng,
                backgroundSize: {width: 64, height: 64}
            }),
            cloudLose: new Image({
                position: {x: 225, y: 100},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 300, height: 135.3},
                foreground: cloudLosePng
            }),
            particlesRain: new Image({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                foreground: particlesRainPng
            }),
        }
    }

    focused() {
        const {cloudLose} = this.layout
        this.titleLevel.text = "Level 11"
        rain({
            container: cloudLose,
            position: {x: 64, y: 128},
            size: {width: 450 - 128, height: 64},
        })
    }

}
