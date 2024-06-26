import {playSound, View} from "../engine"
import Image from "./views/Image"
import Button from "./views/Button"
import Label from "./views/Label"
import Progress from "./views/Progress"
import {Container} from "pixi.js"
import {panelBoosters} from "../features/ninePatch"
import {BoosterPanel} from "./views/BoosterPanel"
import {GameView} from "../game/view"
import {
    backgroundGameJpg,
    buttonCircleBluePng,
    buttonCircleGreenPng,
    buttonCircleRedPng,
    clickDisabledMp3,
    clickEnabledMp3,
    iconBackwardPng,
    iconExitPng,
    iconForwardPng,
    iconResetPng,
    panelHeadlineDarkPng,
    panelMovesPng,
    panelProgressPng
} from "../../res"
import {Booster} from "../types/Booster"
import {animateBoosterIcon, animatePulse, clearBoosterIconAnimation} from "../features/animations"
import {Tile} from "../types/Tile"
import {Click} from "../types/Hit"
import {GameController} from "../game/controller"

type Layout = {
    background: Image
    score: Label
    panelBoosters: Container
    boosterVerticalBomb: BoosterPanel
    boosterHorizontalBomb: BoosterPanel
    boosterDynamite: BoosterPanel
    boosterColorBomb: BoosterPanel
    gameView: GameView
    indicatorProgress: Progress
    panelProgress: Image
    backgroundMoves: Image
    buttonBackward: Button
    buttonForward: Button
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
    buttonMix: Button
}

export default class GameScreen extends View<Layout> {

    constructor() {
        super({width: 450, height: 800})
        this.layout = {
            background: new Image({
                position: {x: 0, y: 0},
                size: {width: 450, height: 800},
                foreground: backgroundGameJpg,
                fill: "horizontal",
                gravity: "up"
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
            panelBoosters: panelBoosters({
                position: {x: 258, y: 738},
                size: {width: 380, height: 120},
            }),
            boosterVerticalBomb: new BoosterPanel({
                position: {x: 212, y: 738},
                size: {width: 100, height: 100},
                booster: 'vertical',
            }),
            boosterHorizontalBomb: new BoosterPanel({
                position: {x: 121, y: 738},
                size: {width: 100, height: 100},
                booster: 'horizontal',
            }),
            boosterDynamite: new BoosterPanel({
                position: {x: 303, y: 738},
                size: {width: 100, height: 100},
                booster: 'dynamite',
            }),
            boosterColorBomb: new BoosterPanel({
                position: {x: 394, y: 738},
                size: {width: 100, height: 100},
                booster: 'reset',
            }),
            gameView: new GameView({
                position: {x: 0, y: 35}
            }),
            indicatorProgress: new Progress({
                position: {x: 195, y: 143}
            }),
            panelProgress: new Image({
                position: {x: 0, y: 0},
                size: {width: 450, height: 180},
                foreground: panelProgressPng,
            }),
            backgroundMoves: new Image({
                position: {x: 85, y: 80},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 116.4, height: 80},
                foreground: panelMovesPng
            }),
            buttonBackward: new Button({
                position: {x: 44, y: 80},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 32, height: 32},
                foreground: iconBackwardPng,
                background: buttonCircleGreenPng,
                backgroundSize: {width: 48, height: 48},
                clickDelay: 0.1,
                sound: false,
            }),
            buttonForward: new Button({
                position: {x: 126, y: 80},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 32, height: 32},
                foreground: iconForwardPng,
                background: buttonCircleGreenPng,
                backgroundSize: {width: 48, height: 48},
                clickDelay: 0.1,
                sound: false,
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
                position: {x: 35, y: 720},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 32, height: 32},
                foreground: iconExitPng,
                background: buttonCircleBluePng,
                backgroundSize: {width: 64, height: 64},
            }),
            buttonMix: new Button({
                position: {x: 225, y: 400},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 60, height: 60},
                foreground: iconResetPng,
                background: buttonCircleRedPng,
                backgroundSize: {width: 120, height: 120},
            }),
        }
    }

    init(controller: GameController) {
        const {model, navigation} = controller
        const {
            buttonForward,
            buttonBackward,
            boosterHorizontalBomb,
            boosterVerticalBomb,
            boosterDynamite,
            boosterColorBomb,
            buttonMix,
            gameView,
            exit
        } = this.layout
        buttonBackward.layout.click = () => controller.emit('movePrevious')
        buttonForward.layout.click = () => controller.emit('moveNext')
        boosterHorizontalBomb.onpointerdown = () => this.selectedBooster = boosterHorizontalBomb.layout.booster
        boosterVerticalBomb.onpointerdown = () => this.selectedBooster = boosterVerticalBomb.layout.booster
        boosterDynamite.onpointerdown = () => this.selectedBooster = boosterDynamite.layout.booster
        boosterColorBomb.onpointerdown = () => this.selectedBooster = boosterColorBomb.layout.booster
        buttonMix.layout.click = () => controller.emit('mixCells')
        gameView.layout.click = (tile: Tile) => {
            if (!model.isLastVersion) return playSound(clickDisabledMp3)
            if (buttonMix.visible) return playSound(clickDisabledMp3)
            const click: Click = {
                consume: model.game.cells[tile.row][tile.column],
                produce: this.#selectedBooster
            }
            controller.emit('clickCell', click)
        }
        exit.layout.click = () => navigation.navigateQuitDialog()
    }

    update(controller: GameController) {
        const {model} = controller
        const {profile, level} = model
        const {buttonMix, coins, moves, goal, indicatorProgress, boosterHorizontalBomb, boosterVerticalBomb, boosterDynamite, boosterColorBomb} = this.layout

        // prices
        const horizontalPrice: number = level.price('horizontal')
        const verticalPrice: number = level.price('vertical')
        const dynamitePrice: number = level.price('dynamite')
        const resetPrice: number = level.price('reset')
        const labelHorizontalBomb: Label = boosterHorizontalBomb.price.children[1] as Label
        const labelVerticalBomb: Label = boosterVerticalBomb.price.children[1] as Label
        const labelDynamite: Label = boosterDynamite.price.children[1] as Label
        const labelColorBomb: Label = boosterColorBomb.price.children[1] as Label
        labelHorizontalBomb.text = horizontalPrice
        labelVerticalBomb.text = verticalPrice
        labelDynamite.text = dynamitePrice
        labelColorBomb.text = resetPrice
        boosterHorizontalBomb.enabled = profile.coins >= horizontalPrice
        boosterVerticalBomb.enabled = profile.coins >= verticalPrice
        boosterDynamite.enabled = profile.coins >= dynamitePrice
        boosterColorBomb.enabled = profile.coins >= resetPrice

        // booster
        if (this.#selectedBooster !== undefined && this.#selectedBooster !== 'mix') if (model.profile.coins < level.price(this.#selectedBooster)) this.selectedBooster = undefined // quickfix todo improve

        // buttonMix
        buttonMix.visible = !model.hasLegitimateMoves() && model.mixTries < level.mixTries
        animatePulse(buttonMix)

        // indicators
        coins.text = profile.coins
        moves.text = level.moves - model.moves
        goal.text = level.goal
        indicatorProgress.progress = model.score / level.goal
    }

    /*properties*/

    #selectedBooster: Booster | undefined

    private set selectedBooster(selectedBooster: Booster | undefined) {
        playSound(clickEnabledMp3)
        const animateBoosterSelection = (selectedBooster: Booster | undefined) => {
            if (this.#selectedBooster !== undefined) clearBoosterIconAnimation(resolveBoosterIcon(this, this.#selectedBooster))
            if (selectedBooster !== undefined) animateBoosterIcon(resolveBoosterIcon(this, selectedBooster))
            this.#selectedBooster = selectedBooster
        }
        if (this.#selectedBooster !== selectedBooster) {
            animateBoosterSelection(selectedBooster)
        } else {
            animateBoosterSelection(undefined)
        }
    }

}

function resolveBoosterIcon(screen: GameScreen, booster: Booster): Container {
    const {boosterVerticalBomb, boosterHorizontalBomb, boosterColorBomb, boosterDynamite, buttonMix} = screen.layout
    switch (booster) {
        case 'vertical':
            return boosterVerticalBomb.icon.foregroundContainer
        case 'horizontal':
            return boosterHorizontalBomb.icon.foregroundContainer
        case 'reset':
            return boosterColorBomb.icon.foregroundContainer
        case 'dynamite':
            return boosterDynamite.icon.foregroundContainer
        case 'mix':
            return buttonMix
    }
}
