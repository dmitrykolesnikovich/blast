import {Grid} from "./Grid"
import {Balance, PriceFormula, ScoreFormula} from "./Balance"
import {Cell} from "./Cell"

export type Level = {
    readonly grid: Grid
    readonly colorsCount: number
    readonly groupSize: number
    readonly mixTries: number
    readonly goal: number
    readonly moves: number
    readonly score: ScoreFormula
    readonly coins: number
    readonly boosterSize: number
    readonly cells: Cell[][]
    readonly price: PriceFormula
}

export function buildLevel(level: number, balance: Balance): Level {
    return {
        grid: balance.grid(level),
        colorsCount: balance.colorsCount(level),
        groupSize: balance.groupSize(level),
        mixTries: balance.mixTries(level),
        goal: balance.goal(level),
        moves: balance.moves(level),
        score: balance.score,
        coins: balance.coins(level),
        boosterSize: balance.boosterSize(level),
        cells: balance.cells(level),
        price: balance.price,
    }
}
