import {ColorSource, Container, Graphics, ISize, RoundedRectangle} from "pixi.js"
import {Grid} from "./Grid"
import {ClickTileListener, Tile} from "./Tile"
import {range} from "../engine"

export class Board extends Container {

    #size: ISize
    readonly grid: Grid
    readonly background: Graphics = this.addChild(new Graphics())
    readonly tiles: Tile[][]

    constructor(grid: Grid, clickListener: ClickTileListener) {
        super()
        this.grid = grid
        this.tiles = new Array<Array<Tile>>(grid.rows)
        for (const row of range(grid.rows - 1, 0)) {
            this.tiles[row] = new Array<Tile>(grid.columns)
            for (const column of range(grid.columns - 1, 0)) {
                const tile: Tile = this.addChild(new Tile(row, column))
                tile.eventMode = 'static'
                tile.on('pointerdown', () => clickListener(tile))
                this.tiles[row][column] = tile
            }
        }
    }

    set size(size: ISize) {
        this.#size = size
        const bounds: RoundedRectangle = resolveBoardBounds(this)
        const backgroundColor: ColorSource = resolveBoardBackgroundColor(this)
        this.background.clear().beginFill(backgroundColor).drawRoundedRect(bounds.x, bounds.y, bounds.width, bounds.height, bounds.radius).endFill()
    }

    get size(): ISize {
        return this.#size
    }

}

// noinspection JSUnusedLocalSymbols
function resolveBoardBackgroundColor(board: Board): ColorSource {
    return '#1E4D6F'
}

function resolveBoardBounds(board: Board): RoundedRectangle {
    function resolveBoardPadding(board: Board): number {
        switch (board.grid.columns) {
            case 2:
                return 16
            case 3:
                return 12
            default:
                return 8
        }
    }

    const padding: number = resolveBoardPadding(board)
    return new RoundedRectangle(-3, -padding, board.size.width + 6, board.size.height + 2 * padding, 12)
}
