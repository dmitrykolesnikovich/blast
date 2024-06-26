import {check, flatArray, range} from "../engine"
import {Cell, initCells} from "./Cell"

export class CellSequence {

    private readonly cells: Cell[]
    readonly capacity: number

    constructor(cells: Cell[]) {
        this.cells = cells
        this.capacity = cells.length
    }

    remove(cell: Cell) {
        const index: number = this.indexOf(cell)
        this.cells.removeAt(index)
    }

    push(element: Cell) {
        this.cells.push(element)
    }

    insert(cell: Cell) {
        const index: number = this.indexOf(cell)
        this.cells.insertAt(index, cell)
    }

    forEach(each: (cell: Cell, initialRow: number, actualRow: number) => void) {
        for (const cell of this.cells) {
            const initialRow: number = cell.row
            const actualRow: number = this.rowOf(cell)
            each(cell, initialRow, actualRow)
        }
    }

    /*internals*/

    private rowOf(cell: Cell): number {
        return this.capacity - 1 - this.cells.indexOf(cell)
    }

    private indexOf(cell: Cell): number {
        return this.capacity - 1 - cell.row
    }

}

export function convertCellsToSequences(cells: Cell[][]): CellSequence[] {
    const columns: number = cells[0].length
    const sequences: CellSequence[] = new Array<CellSequence>(columns)
    const flatCells: Cell[] = flatArray(cells).reverse() // IMPORTANT reversed
    for (const column of range(0, columns - 1)) {
        sequences[column] = new CellSequence(flatCells.filter(cell => cell.column === column))
    }
    return sequences
}

export function convertSequencesToCells(sequences: CellSequence[]): Cell[][] {
    const columns: number = sequences.length
    const rows: number = sequences[0].capacity
    const cells: Cell[][] = initCells({rows, columns})
    sequences.forEach((sequence, column) => {
        sequence.forEach((cell, initialRow, actualRow) => {
            if (actualRow < 0) return // IMPORTANT drop cells out of capacity
            cells[actualRow][column] = {...cell, row: actualRow}
        })
    })
    return cells
}

export function convertSequencesToGaps(sequences: CellSequence[]): number[][] {
    const columns: number = sequences.length
    const rows: number = sequences[0].capacity
    const gaps: number[][] = new Array<Array<number>>(rows)
    for (const row of range(0, rows - 1)) gaps[row] = new Array<number>(columns)
    sequences.forEach((sequence, column) => {
        sequence.forEach((cell, initialRow, actualRow) => {
            const gap: number = initialRow - actualRow
            check('gap >= 0', gap >= 0)
            gaps[initialRow][column] = gap
        })
    })
    return gaps
}
