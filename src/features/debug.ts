import {Block} from "../types/Block"
import {convertBlocksToCells, Cell} from "../types/Cell"
import {Group} from "../types/Group"
import {buildGroups} from "./groups"
import {Game, initGame} from "../types/Game"

/*groups*/

export function debugGroups(blocks: Block[][]): number[][] {
    const cells: Cell[][] = convertBlocksToCells(blocks)
    const groups: Group[][] = buildGroups(cells)
    return cells.map(row => row.map(cell => groups[cell.row][cell.column].id))
}

/*games*/

const R: Block = 'red'
const G: Block = 'green'
const P: Block = 'purple'
const Y: Block = 'yellow'
const B: Block = 'blue'

export const GAME1: Game = initGame([
    [B, B, Y, R, P, G, P, G],
    [P, P, Y, P, R, P, Y, B],
    [Y, G, G, Y, Y, B, Y, G],
    [Y, B, Y, R, G, R, Y, B],
    [P, G, P, P, G, G, Y, R],
    [B, B, P, R, G, B, P, R],
    [Y, B, P, G, G, Y, Y, Y],
    [P, Y, P, P, B, P, Y, B]
])
