import {Cell} from "../types/Cell"
import {CellSequence, convertCellsToSequences, convertSequencesToCells, convertSequencesToGaps} from "../types/CellSequence"
import {Hit} from "../types/Hit"
import {Streak} from "../types/Streak"

export type Forward = {
    readonly hit: Hit
    readonly push: Streak
    readonly insert: Streak
}

export type Backward = {
    readonly hit: Hit
    readonly insert: Cell[]
    readonly remove: Cell[]
}

export function EmptyForward(hit: Hit): Forward {
    return ({hit, push: {from: [], to: []}, insert: {from: [], to: []}})
}

export function convertForwardToBackward(forward: Forward): Backward {
    return {
        hit: forward.hit,
        insert: [...forward.push.from, ...forward.insert.from],
        remove: forward.insert.from,
    }
}

export function isBackwardEmpty(backward: Backward): boolean {
    return backward.insert.isEmpty()
}

// forward: remove -> push -> insert
export function shiftCellsForward(cells: Cell[][], forward: Forward): Cell[][] {
    const sequences: CellSequence[] = convertCellsToSequences(cells)
    for (const cell of accedingRows([...forward.push.from, ...forward.insert.from]))
        sequences[cell.column].remove(cell)
    for (const cell of descendingRows(forward.push.to))
        sequences[cell.column].push(cell)
    for (const cell of descendingRows(forward.insert.to))
        sequences[cell.column].insert(cell)
    return convertSequencesToCells(sequences)
}

// backward: remove -> insert
export function shiftCellsBackwards(cells: Cell[][], backwards: Backward[]): Cell[][] {
    const sequences: CellSequence[] = convertCellsToSequences(cells)
    for (const backward of backwards) {
        for (const cell of accedingRows(backward.remove))
            sequences[cell.column].remove(cell)
        for (const cell of descendingRows(backward.insert))
            sequences[cell.column].insert(cell)
    }
    return convertSequencesToCells(sequences)
}

// backward: remove -> insert
export function shiftGapsBackward(cells: Cell[][], backward: Backward): number[][] {
    const sequences: CellSequence[] = convertCellsToSequences(cells)
    for (const cell of accedingRows(backward.remove))
        sequences[cell.column].remove(cell)
    for (const cell of descendingRows(backward.insert))
        sequences[cell.column].insert(cell)
    return convertSequencesToGaps(sequences)
}

/*internals*/

function accedingRows(cells: Cell[]): Cell[] {
    return cells.sort((c1, c2) => c1.row - c2.row)
}

function descendingRows(cells: Cell[]): Cell[] {
    return cells.sort((c1, c2) => c2.row - c1.row)
}
