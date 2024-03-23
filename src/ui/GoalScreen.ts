import {Container} from "pixi.js"
import {View} from "../engine"
import {panelGoal, panelInfo, popup1} from "../features/ninePatch"
import Button from "./views/Button"
import Image from "./views/Image"
import Label from "./views/Label"
import {buttonRectangleRedPng, life1Png} from "../../res"

type Layout = {
    panelAlert1: Container
    title: Label
    goal: Container
    play: Button
}

export default class GoalScreen extends View<Layout> {

    constructor() {
        super({width: 450, height: 800})
        this.layout = {
            panelAlert1: popup1({
                position: {x: 225, y: 400},
                size: {width: 450, height: 440},
            }),
            title: new Label({
                position: {x: 225, y: 300},
                anchor: {x: 0.5, y: 0.5},
                style: {
                    fontSize: 24,
                    fill: 0x15B8E5,
                    align: 'center',
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                },
                text: "Goal:"
            }),
            goal: panelInfo({
                position: {x: 225, y: 370},
                size: {width: 300, height: 100},
            }),
            play: new Button({
                position: {x: 225, y: 477},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 200, height: 70},
                foreground: buttonRectangleRedPng,
                icons: [
                    new Image({
                        position: {x: 0, y: 0},
                        anchor: {x: 1.33, y: 0.5},
                        size: {width: 64, height: 46.77},
                        foreground: life1Png
                    })
                ],
                label: new Label({
                    position: {x: 0, y: 0},
                    anchor: {x: 0.2, y: 0.55},
                    text: "Play!",
                    style: {
                        fontSize: 36,
                        fill: 'white',
                        align: 'left',
                        fontFamily: 'fredokaOne',
                        fontWeight: '400',
                    }
                })
            }),
        }
    }

}
