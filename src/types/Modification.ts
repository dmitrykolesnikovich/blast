import {Cell} from "./Cell"
import {Game} from "./Game"
import {Backward, Forward, isBackwardEmpty, shiftCellsBackwards} from "../features/shift"
import {Hit} from "./Hit"

export type Modification = Upgrade | Downgrade | Checkout

export class Upgrade {

    readonly backward: Backward
    readonly version: Version
    readonly from: Cell[][]
    readonly to: Cell[][]

    constructor({backward, version, from, to}: Upgrade) {
        this.backward = backward
        this.version = version
        this.from = from
        this.to = to
    }

}

export class Downgrade {

    readonly backward: Backward
    readonly version: Version
    readonly from: Cell[][]
    readonly to: Cell[][]

    constructor({backward, version, from, to}: Downgrade) {
        this.backward = backward
        this.version = version
        this.from = from
        this.to = to
    }

}

export class Checkout {

    readonly version: Version
    readonly to: Cell[][]

    constructor({version, to}: Checkout) {
        this.version = version
        this.to = to
    }

}

export type Move = {
    readonly from: Version
    readonly to: Version
}

export type Version = number

export function isModificationEmpty(modification: Modification): boolean {
    if (modification instanceof Checkout) return true
    return isBackwardEmpty(modification.backward)
}

export function buildUpgrade(game: Game, version: Version): Upgrade {
    const {cells, backwards} = game
    const index: number = backwards.length - version
    const backward: Backward = backwards[index]
    return new Upgrade({
        backward,
        version,
        from: shiftCellsBackwards(cells, backwards.slice(0, index + 1)),
        to: shiftCellsBackwards(cells, backwards.slice(0, index))
    })
}

export function buildDowngrade(game: Game, version: Version): Downgrade {
    const {cells, backwards} = game
    const index: number = backwards.length - version
    const backward: Backward = backwards[index - 1]
    return new Downgrade({
        backward,
        version,
        from: shiftCellsBackwards(cells, backwards.slice(0, index - 1)),
        to: shiftCellsBackwards(cells, backwards.slice(0, index))
    })
}

export function buildCheckout(game: Game, version: Version): Checkout {
    const {cells, backwards} = game
    const index: number = backwards.length - version
    return new Checkout({
        version: version,
        to: shiftCellsBackwards(cells, backwards.slice(0, index))
    })
}
