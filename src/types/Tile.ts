import {Container, ISize, Sprite} from "pixi.js"
import {Board} from "./Board"

export type ClickTileListener = (tile: Tile) => void

export class Tile extends Container {

    readonly row: number
    readonly column: number
    readonly sprite: Sprite = this.addChild(new Sprite())

    constructor(row: number, column: number) {
        super()
        this.row = row
        this.column = column
        this.sprite.anchor.set(0.5, 0.5)
    }

    get board(): Board {
        return this.parent as Board
    }

    get size(): ISize {
        return {
            width: this.width,
            height: this.height,
        }
    }

}
