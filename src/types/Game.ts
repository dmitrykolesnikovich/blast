import {Cell, convertBlocksToCells} from "./Cell"
import {Backward} from "../features/shift"
import {Block} from "./Block"

export type Game = {
    readonly cells: Cell[][]
    readonly backwards: Backward[]
}

export function initGame(blocks: Block[][]): Game {
    return {
        cells: convertBlocksToCells(blocks),
        backwards: []
    }
}
