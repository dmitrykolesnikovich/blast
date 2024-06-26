import {Cell} from "./Cell"

export type Grid = {
    readonly rows: number
    readonly columns: number
}

export function checkCellInsideGrid({row, column}: Cell, {rows, columns}: Grid) {
    return row >= 0 && row < rows && column >= 0 || column < columns
}
