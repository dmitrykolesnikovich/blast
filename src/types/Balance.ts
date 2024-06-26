import {Grid} from "./Grid"
import {Cell} from "./Cell"
import {Hit} from "./Hit"
import {Booster} from "./Booster"

export type Formula<T = number> = (level: number) => T
export type CellsFormula = Formula<Cell[][]>
export type GridFormula = Formula<Grid>
export type ScoreFormula = (hit: Hit, scored: Cell[]) => number
export type PriceFormula = (booster: Booster) => number

export type Balance = {
    readonly cells: CellsFormula // генератор уровня
    readonly grid: GridFormula // размер игрового поля
    readonly colorsCount: Formula // количество возможных вариантов цветов у тайлов
    readonly groupSize: Formula // минимальный размер группы прилегающих тайлов одинакового же цвета, сжигаемых при клике
    readonly mixTries: Formula // количество перемешиваний игрового поля
    readonly goal: Formula // значение количества очков для выигрыша
    readonly moves: Formula // значение количества ходов для выигрыша
    readonly score: ScoreFormula // формула начисления очков за выигрыш
    readonly coins: Formula // формула начисления монеток за выигрыш
    readonly boosterSize: Formula // размер группы тайлов, при привышении которого на месте клетки, по которой был клик, появится произвольный бустер
    readonly price: PriceFormula // стоимость бустера в монетах
}
