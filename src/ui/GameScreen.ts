import {setupAdaptiveContainerLayout, View} from "../engine"
import Image from "./views/Image"
import Button from "./views/Button"
import Label from "./views/Label"
import settings from "../features/settings"
import Progress from "./views/Progress"
import {
    backgroundGameJpg,
    boosterColorBombPng,
    boosterDynamitePng,
    boosterHorizontalBombPng,
    boosterVerticalBombPng,
    buttonBoosterPng,
    buttonCircleBluePng,
    iconExitPng,
    panelBoostersPng,
    panelHeadlineDarkPng,
    panelMovesPng,
    panelProgressPng,
} from "../../res"
import Navigation from "../features/navigation"
import {ISize} from "pixi.js"

type Layout = {
    background: Image
    indicatorProgress: Progress
    panelProgress: Image
    backgroundMoves: Image
    backgroundGoal: Image
    backgroundCoins: Image
    titleMoves: Image
    titleGoal: Image
    titleCoins: Image
    titleScore: Label
    moves: Label
    goal: Label
    coins: Label
    exit: Button
    score: Label
    panelBoosters: Image
    boosterHorizontalBomb: Button
    boosterVerticalBomb: Button
    boosterDynamite: Button
    boosterColorBomb: Button
}

export default class GameScreen extends View<Layout> {

    constructor(navigation: Navigation) {
        super({width: 450, height: 800})
        this.layout = {
            background: new Image({
                position: {x: 0, y: 0},
                size: {width: 450, height: 800},
                foreground: backgroundGameJpg,
                fill: "horizontal",
                gravity: "up"
            }),
            indicatorProgress: new Progress({
                position: {x: 180, y: 140}
            }),
            panelProgress: new Image({
                position: {x: 0, y: 0},
                size: {width: 450, height: 180},
                foreground: panelProgressPng
            }),
            backgroundMoves: new Image({
                position: {x: 85, y: 80},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 116.4, height: 80},
                foreground: panelMovesPng
            }),
            backgroundGoal: new Image({
                position: {x: 225, y: 80},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 116.4, height: 80},
                foreground: panelMovesPng
            }),
            backgroundCoins: new Image({
                position: {x: 365, y: 80},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 116.4, height: 80},
                foreground: panelMovesPng
            }),
            titleMoves: new Image({
                position: {x: 85, y: 40},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 90, height: 33.7},
                foreground: panelHeadlineDarkPng,
                label: new Label({
                    position: {x: 0, y: 0},
                    anchor: {x: 0.5, y: 0.5},
                    text: "Moves",
                    style: {
                        fontSize: 40,
                        fill: 'white',
                        align: 'left',
                        fontFamily: 'fredokaOne',
                        fontWeight: '400',
                    }
                })
            }),
            titleGoal: new Image({
                position: {x: 225, y: 40},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 90, height: 33.7},
                foreground: panelHeadlineDarkPng,
                label: new Label({
                    position: {x: 0, y: 0},
                    anchor: {x: 0.5, y: 0.5},
                    text: "Goal",
                    style: {
                        fontSize: 40,
                        fill: 'white',
                        align: 'left',
                        fontFamily: 'fredokaOne',
                        fontWeight: '400',
                    }
                })
            }),
            titleCoins: new Image({
                position: {x: 365, y: 40},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 90, height: 33.7},
                foreground: panelHeadlineDarkPng,
                label: new Label({
                    position: {x: 0, y: 0},
                    anchor: {x: 0.5, y: 0.5},
                    text: "Coins",
                    style: {
                        fontSize: 40,
                        fill: 'white',
                        align: 'left',
                        fontFamily: 'fredokaOne',
                        fontWeight: '400',
                    }
                })
            }),
            titleScore: new Label({
                position: {x: 86, y: 154},
                anchor: {x: 0.5, y: 0.5},
                style: {
                    fontSize: 18,
                    fill: 0x50BDFA,
                    align: 'left',
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                },
                text: "Score:"
            }),
            moves: new Label({
                position: {x: 85, y: 85},
                anchor: {x: 0.5, y: 0.5},
                style: {
                    fontSize: 36,
                    fill: 0x364695,
                    align: 'left',
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                }
            }),
            goal: new Label({
                position: {x: 225, y: 85},
                anchor: {x: 0.5, y: 0.5},
                style: {
                    fontSize: 36,
                    fill: 0x364695,
                    align: 'left',
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                }
            }),
            coins: new Label({
                position: {x: 365, y: 85},
                anchor: {x: 0.5, y: 0.5},
                style: {
                    fontSize: 36,
                    fill: 0x364695,
                    align: 'left',
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                }
            }),
            exit: new Button({
                position: {x: 50, y: 720},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 32, height: 32},
                foreground: iconExitPng,
                background: buttonCircleBluePng,
                backgroundSize: {width: 64, height: 64},
                click: () => navigation.navigateQuitDialog()
            }),
            score: new Label({
                position: {x: 120, y: 154},
                anchor: {x: 0, y: 0.5},
                style: {
                    fontSize: 18,
                    fill: 'white',
                    align: 'left',
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                },
                text: "123"
            }),
            panelBoosters: new Image({
                position: {x: 98, y: 720},
                anchor: {x: 0, y: 0.5},
                size: {width: 350, height: 91},
                foreground: panelBoostersPng
            }),
            boosterHorizontalBomb: new Button({
                position: {x: 150, y: 720},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 56, height: 56},
                foreground: boosterHorizontalBombPng,
                background: buttonBoosterPng,
                backgroundSize: {width: 72, height: 72},
            }),
            boosterVerticalBomb: new Button({
                position: {x: 232, y: 720},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 56, height: 56},
                foreground: boosterVerticalBombPng,
                background: buttonBoosterPng,
                backgroundSize: {width: 72, height: 72},
            }),
            boosterDynamite: new Button({
                position: {x: 314, y: 720},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 56, height: 56},
                foreground: boosterDynamitePng,
                background: buttonBoosterPng,
                backgroundSize: {width: 72, height: 72},
            }),
            boosterColorBomb: new Button({
                position: {x: 396, y: 720},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 56, height: 56},
                foreground: boosterColorBombPng,
                background: buttonBoosterPng,
                backgroundSize: {width: 72, height: 72},
                click: () => navigation.navigateWinDialog()
            }),
        }

        const {moves, goal, coins, indicatorProgress} = this.layout
        moves.text = 12
        goal.text = 90
        coins.text = settings.coins
        indicatorProgress.progress = 0.5
    }


}
