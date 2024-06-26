import {Container, Graphics, IPointData} from "pixi.js"
import {Board} from "../types/Board"
import {playModificationAnimation} from "../features/playModificationAnimation"
import {playModificationSound} from "../features/playModificationSound"
import {PlaybackDelegate, PlaybackEvent} from "../features/playback"
import {ClickTileListener, Tile} from "../types/Tile"
import {GameController} from "./controller"

type Layout = {
    position: IPointData
    click?: ClickTileListener
}

export class GameView extends Container implements PlaybackDelegate {

    readonly layout: Layout
    private board: Board

    constructor(layout: Layout) {
        super()
        const {position} = this.layout = layout
        this.position = position
        this.mask = this.addChild(new Graphics().beginFill(0xffffff).drawRect(-1000, -100, 2450, 1550).endFill())
    }

    start({model}: GameController) {
        this.board = this.addChild(new Board(model.level.grid, (tile: Tile) => {
            if (this.layout.click !== undefined) {
                this.layout.click(tile)
            }
        }))
    }

    playback(controller: GameController, {modification, duration}: PlaybackEvent) {
        playModificationSound(modification)
        playModificationAnimation(this.board, modification, duration)
    }

    stop() {
        this.board.removeFromParent()
    }

}
