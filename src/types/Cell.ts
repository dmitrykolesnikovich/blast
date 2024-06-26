import {range} from "../engine"
import {Booster} from "./Booster"
import {Block} from "./Block"
import {Grid} from "./Grid"

export type Cell = {
    readonly row: number
    readonly column: number
    readonly block?: Block
    readonly booster?: Booster
    readonly original?: Cell
}

export function initCells(grid: Grid, initializer?: (row: number, column: number) => Cell): Cell[][] {
    const {rows, columns} = grid
    const cells: Cell[][] = new Array<Array<Cell>>(rows)
    for (const row of range(0, rows - 1)) {
        cells[row] = new Array<Cell>(columns)
        if (initializer !== undefined) {
            for (const column of range(0, columns - 1)) {
                cells[row][column] = initializer(row, column)
            }
        }
    }
    return cells
}

export function convertBlocksToCells(blocks: Block[][]): Cell[][] {
    const rows: number = blocks.length
    const columns: number = blocks[0].length
    const cells: Cell[][] = new Array<Array<Cell>>(rows)
    for (const row of range(0, rows - 1)) {
        cells[row] = new Array<Cell>(columns)
        for (const column of range(0, columns - 1)) {
            cells[row][column] = {row, column, block: blocks[row][column], booster: undefined}
        }
    }
    return cells
}
