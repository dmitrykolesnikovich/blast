import {Controller} from "../engine"
import Navigation from "../features/navigation"
import GameScreen from "../ui/GameScreen"
import {GameModel} from "./model"
import {buildHit, ButtonMixHit, Click} from "../types/Hit"
import {Playback} from "../features/playback"

export class GameController extends Controller {

    readonly model: GameModel
    readonly view: GameScreen
    readonly navigation: Navigation
    readonly playback: Playback

    constructor(navigation: Navigation) {
        super({startGame, stopGame, moveBegin, movePrevious, moveNext, moveEnd, clickCell, mixCells})
        this.model = new GameModel()
        this.view = new GameScreen()
        this.navigation = navigation
        this.playback = new Playback(this, this.view.layout.gameView)
    }

}

/*game*/

function startGame({playback}: GameController) {
    playback.start()
}

function stopGame({playback}: GameController) {
    playback.stop()
}

/*move*/

function moveBegin({model, playback}: GameController) {
    if (!playback.isEmpty) return
    model.moveBegin()
}

function movePrevious({model, playback}: GameController) {
    if (!playback.isEmpty) return
    model.movePrevious()
}

function moveNext({model, playback}: GameController) {
    if (!playback.isEmpty) return
    model.moveNext()
}

function moveEnd({model, playback}: GameController) {
    if (!playback.isEmpty) return
    model.moveEnd()
}

/*hit*/

function clickCell({model, navigation, playback}: GameController, click: Click) {
    if (!playback.isEmpty) return
    model.moveForward(buildHit(click))
    if (model.isLastVersion) {
        if (model.hasWin()) {
            navigation.navigateWinDialog()
        } else if (model.hasLose()) {
            navigation.navigateLoseDialog()
        }
    }
}

function mixCells({model}: GameController) {
    model.moveForward(ButtonMixHit())
}
