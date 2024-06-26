import {Cell} from "../types/Cell"
import {Group} from "../types/Group"
import {forEach, range} from "../engine"
import {Grid} from "../types/Grid"

export function buildGroups(cells: Cell[][]): Group[][] {
    const [rows, columns] = [cells.length, cells[0].length]
    let counter: number = 0
    const groups: Group[][] = initGroups({rows, columns})

    function setGroup(cell: Cell, group: Group) {
        const existing: Group | undefined = groups[cell.row][cell.column]
        if (group === existing) return
        if (existing !== undefined) {
            group.cells.push(...existing.cells)
        } else {
            group.cells.push(cell)
        }
        for (const cell of group.cells) {
            groups[cell.row][cell.column] = group
        }
    }

    function getGroup(cell: Cell): Group | undefined {
        return groups[cell.row][cell.column]
    }

    function ensureGroup(cell: Cell) {
        if (getGroup(cell) === undefined) {
            setGroup(cell, {id: ++counter, cells: []})
        }
    }

    function matchNeighbour(origin: Cell, neighbour: Cell) {
        if (neighbour.block === origin.block) {
            const neighbourGroup: Group | undefined = getGroup(neighbour)
            const originGroup: Group | undefined = getGroup(origin)
            if (neighbourGroup !== undefined) {
                setGroup(origin, neighbourGroup)
            } else if (originGroup !== undefined) {
                setGroup(neighbour, originGroup)
            }
        }
    }

    forEach(cells, (cell: Cell) => {
        const {row, column} = cell
        if (column - 1 >= 0) matchNeighbour(cell, cells[row][column - 1])
        if (row - 1 >= 0) matchNeighbour(cell, cells[row - 1][column])
        if (column + 1 < columns) matchNeighbour(cell, cells[row][column + 1])
        if (row + 1 < rows) matchNeighbour(cell, cells[row + 1][column])
        ensureGroup(cell)
    })

    return groups
}

function initGroups({rows, columns}: Grid): Group[][] {
    const groups: Group[][] = new Array<Array<Group>>(rows)
    for (const row of range(0, rows - 1)) {
        groups[row] = new Array<Group>(columns)
    }
    return groups
}
