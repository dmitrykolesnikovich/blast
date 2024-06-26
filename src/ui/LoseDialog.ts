import {Controller, isMobile, playSound, stopSound, stopSoundLoop, View} from "../engine"
import Image from "./views/Image"
import {Container, Graphics} from "pixi.js"
import {panelAlert, panelHeadLine} from "../features/ninePatch"
import Label from "./views/Label"
import Button from "./views/Button"
import gsap, {Back, Elastic, Power3} from "gsap"
import {
    buttonCircleGreenPng,
    buttonCircleRedPng,
    cloudLosePng,
    iconLevelPng,
    iconRepeatPng,
    loseMp3,
    panelFlagGreyPng,
    particlesRainPng,
    rainMp3
} from "../../res"
import {emitRain} from "../features/particles"
import Navigation from "../features/navigation"
import {Emitter} from "@pixi/particle-emitter"
import {GameModel} from "../game/model"
import {GameController} from "../game/controller"

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
    cloudLose: Image
}

const cloudY: number = 100

export default class LoseDialog extends View<Layout> {

    private rainEmitter: Emitter

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

    constructor(navigation: Navigation) {
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
            panelAlert2: panelAlert({
                position: {x: 225, y: 470},
                size: {width: 440, height: 200},
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
                backgroundSize: {width: 64, height: 64},
            }),
            repeat: new Button({
                position: {x: 270, y: 580},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 32, height: 32},
                foreground: iconRepeatPng,
                background: buttonCircleGreenPng,
                backgroundSize: {width: 64, height: 64},
            }),
            cloudLose: new Image({
                position: {x: 225, y: cloudY},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 300, height: 135.3},
                foreground: cloudLosePng,
            }),
        }
        this.titleLevel.text = "Level 11"
        if (!isMobile()) this.enableMask()
    }

    focused(controller: GameController) {
        const {model, navigation} = controller
        const {cloudLose, goal, score, menu, repeat} = this.layout

        // progress
        goal.text = model.level.goal
        score.text = model.score

        // cloud
        cloudLose.y = cloudY - 200
        this.rainEmitter = emitRain({
            container: cloudLose,
            position: {x: -150 + 32, y: 32},
            size: {width: 300 - 64, height: 64},
        })
        gsap.timeline()
            .set(cloudLose, {alpha: 0.22, y: cloudY - 200})
            .to(cloudLose, {
                alpha: 1, y: cloudY, duration: 1, ease: Power3.easeInOut, onComplete: () => {
                    playSound(rainMp3)
                }
            })

        // buttons
        menu.layout.click = () => {
            controller.emit('stopGame')
            navigation.navigateLevelChooserScreen()
        }
        repeat.layout.click = () => {
            controller.emit('stopGame')
            this.animateHideDialog(navigation)
            navigation.selectLevel(model.profile.level)
            navigation.navigateGameScreen()

        }
    }

    removed() {
        stopSound(loseMp3)
        stopSoundLoop(rainMp3)
        this.rainEmitter.destroy()
    }

    private animateHideDialog(navigation: Navigation) {
        const {cloudLose} = this.layout
        gsap.timeline()
            .set(cloudLose, {alpha: 1, y: cloudY})
            .to(cloudLose, {
                alpha: 0, y: cloudY - 100, duration: 0.2, ease: Power3.easeInOut, onComplete: () => {
                    navigation.hideDialog(this)
                }
            })
    }

}
