import Image from "./views/Image"
import {playSound, View} from "../engine"
import {Container} from "pixi.js"
import {panelAlert} from "../features/ninePatch"
import Label from "./views/Label"
import Button from "./views/Button"
import Navigation from "../features/navigation"
import {animateRadialShine} from "../features/animations"
import {
    buttonCircleGreenPng,
    buttonCircleRedPng,
    iconLevelPng,
    iconNextPng,
    iconRepeatPng,
    panelFlagBluePng,
    panelHeadlineDarkPng,
    particlesShineRadial1Png,
    particlesShineRadial2Png,
    winMp3
} from "../../res"
import {GameController} from "../game/controller"

type Layout = {
    particlesShineRadial1: Image
    particlesShineRadial2: Image
    panelAlert: Container
    panelHeadlineDark: Image
    scoreDescription: Label
    score: Label
    coinsDescription: Label
    coins: Label
    panelFlagBlue: Image
    menu: Button
    repeat: Button
    next: Button
}

export default class WinDialog extends View<Layout> {

    constructor(navigation: Navigation) {
        super({width: 450, height: 800})
        this.layout = {
            particlesShineRadial1: new Image({
                position: {x: 225, y: 280},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 900, height: 900},
                foreground: particlesShineRadial1Png
            }),
            particlesShineRadial2: new Image({
                position: {x: 225, y: 280},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 900, height: 900},
                foreground: particlesShineRadial2Png
            }),
            panelAlert: panelAlert({
                position: {x: 225, y: 375},
                size: {width: 440, height: 240},
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
                    style: {
                        fontSize: 40,
                        fill: 'white',
                        align: 'left',
                        fontFamily: 'fredokaOne',
                        fontWeight: '400',
                    }
                })
            }),
            scoreDescription: new Label({
                position: {x: 240 + 18, y: 370},
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
                position: {x: 240 + 32, y: 370},
                anchor: {x: 0, y: 0.5},
                style: {
                    fontSize: 24,
                    fill: 0xff4258,
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                    align: "center",
                }
            }),
            coinsDescription: new Label({
                position: {x: 240 + 18, y: 410},
                anchor: {x: 1, y: 0.5},
                text: "Reward:",
                style: {
                    fontSize: 24,
                    fill: 0x1A9DCA,
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                    align: "center",
                }
            }),
            coins: new Label({
                position: {x: 240 + 32, y: 410},
                anchor: {x: 0, y: 0.5},
                text: "345",
                style: {
                    fontSize: 24,
                    fill: 0xff4258,
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                    align: "center",
                }
            }),
            menu: new Button({
                position: {x: 135, y: 500},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 32, height: 32},
                foreground: iconLevelPng,
                background: buttonCircleRedPng,
                backgroundSize: {width: 64, height: 64},
            }),
            repeat: new Button({
                position: {x: 225, y: 500},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 32, height: 32},
                foreground: iconRepeatPng,
                background: buttonCircleGreenPng,
                backgroundSize: {width: 64, height: 64},

            }),
            next: new Button({
                position: {x: 315, y: 500},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 32, height: 32},
                foreground: iconNextPng,
                background: buttonCircleGreenPng,
                backgroundSize: {width: 64, height: 64},
            }),
        }
    }

    focused(controller: GameController) {
        const {model, navigation} = controller
        const {particlesShineRadial1, particlesShineRadial2, score, coins, menu, repeat, next, panelHeadlineDark} = this.layout

        playSound(winMp3)
        animateRadialShine(particlesShineRadial1, particlesShineRadial2)
        score.text = model.score
        coins.text = model.level.coins
        menu.layout.click = () => {
            controller.emit('stopGame')
            navigation.selectLevel(model.profile.level + 1)
            navigation.navigateLevelChooserScreen()
        }
        repeat.layout.click = () => {
            controller.emit('stopGame')
            navigation.selectLevel(model.profile.level + 1)
            navigation.navigateGameScreen()
        }
        next.layout.click = () => {
            controller.emit('stopGame')
            navigation.selectLevel(model.profile.level + 1)
            navigation.navigateGameScreen()
        }
        const label: Label | undefined = panelHeadlineDark.layout.label
        if (label !== undefined) {
            label.text = `Level ${model.profile.level + 1}`
        }
    }

}
