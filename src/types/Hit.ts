import {Cell} from "./Cell"
import {Booster} from "./Booster"
import {GameModel} from "../game/model"
import {flatArray} from "../engine"

export type Click = {
    produce?: Booster
    consume: Cell
}

export type Hit =
    ConsumeBlockHit |
    ConsumeHorizontalHit |
    ConsumeVerticalHit |
    ConsumeDynamiteHit |
    ConsumeResetHit |
    ProduceHorizontalHit |
    ProduceVerticalHit |
    ProduceDynamiteHit |
    ProduceResetHit |
    ButtonMixHit

export type HitArea = (model: GameModel) => Cell[]

type ConsumeBlockHit = {
    readonly type: 'ConsumeBlock',
    readonly produce: undefined,
    readonly consume: Cell,
    readonly area: HitArea
}

type ConsumeHorizontalHit = {
    readonly type: 'ConsumeHorizontal',
    readonly produce: undefined,
    readonly consume: Cell,
    readonly area: HitArea
}

type ConsumeVerticalHit = {
    readonly type: 'ConsumeVertical',
    readonly produce: undefined,
    readonly consume: Cell,
    readonly area: HitArea
}

type ConsumeDynamiteHit = {
    readonly type: 'ConsumeDynamite',
    readonly produce: undefined,
    readonly consume: Cell,
    readonly area: HitArea
}

type ConsumeResetHit = {
    readonly type: 'ConsumeReset',
    readonly produce: undefined,
    readonly consume: Cell,
    readonly area: HitArea
}

type ProduceHorizontalHit = {
    readonly type: 'ProduceHorizontal',
    readonly produce: 'horizontal',
    readonly consume: Cell,
    readonly area: HitArea
}

type ProduceVerticalHit = {
    readonly type: 'ProduceVertical',
    readonly produce: 'vertical',
    readonly consume: Cell,
    readonly area: HitArea
}

type ProduceDynamiteHit = {
    readonly type: 'ProduceDynamite',
    readonly produce: 'dynamite',
    readonly consume: Cell,
    readonly area: HitArea
}

type ProduceResetHit = {
    readonly type: 'ProduceReset',
    readonly produce: 'reset',
    readonly consume: Cell,
    readonly area: HitArea
}

type ButtonMixHit = {
    readonly type: 'ButtonMix',
    readonly produce: 'mix',
    readonly consume: undefined,
    readonly area: HitArea
}

export function buildHit(click: Click): Hit {
    const {produce, consume} = click
    switch (produce) {
        case 'horizontal':
            return ProduceHorizontalHit(consume)
        case 'vertical':
            return ProduceVerticalHit(consume)
        case 'dynamite':
            return ProduceDynamiteHit(consume)
        case 'reset':
            return ProduceResetHit(consume)
    }
    switch (consume.booster) {
        case 'horizontal':
            return ConsumeHorizontalHit(consume)
        case 'vertical':
            return ConsumeVerticalHit(consume)
        case 'dynamite':
            return ConsumeDynamiteHit(consume)
        case 'reset':
            return ConsumeResetHit(consume)
    }
    return ConsumeBlockHit(consume)
}

export const ConsumeBlockHit = (consume: Cell): ConsumeBlockHit => ({
    type: 'ConsumeBlock',
    produce: undefined,
    consume,
    area: (model) => model.groups[consume.row][consume.column].cells
})
export const ConsumeHorizontalHit = (consume: Cell): Hit => ({
    type: 'ConsumeHorizontal',
    produce: undefined,
    consume,
    area: (model) => flatArray(model.game.cells).filter(cell => cell.row === consume.row)
})
export const ConsumeVerticalHit = (consume: Cell): Hit => ({
    type: 'ConsumeVertical',
    produce: undefined,
    consume,
    area: (model) => flatArray(model.game.cells).filter(cell => cell.column === consume.column)
})
export const ConsumeDynamiteHit = (consume: Cell): Hit => ({
    type: 'ConsumeDynamite',
    produce: undefined,
    consume,
    area: (model) => flatArray(model.game.cells).filter(cell => (Math.abs(cell.column - consume.column) + Math.abs(cell.row - consume.row)) <= 2)
})
export const ConsumeResetHit = (consume: Cell): Hit => ({
    type: 'ConsumeReset',
    produce: undefined,
    consume,
    area: (model) => flatArray(model.game.cells)
})
export const ProduceHorizontalHit = (consume: Cell): Hit => ({
    type: 'ProduceHorizontal',
    produce: 'horizontal',
    consume,
    area: () => [consume]
})
export const ProduceVerticalHit = (consume: Cell): Hit => ({
    type: 'ProduceVertical',
    produce: 'vertical',
    consume,
    area: () => [consume]
})
export const ProduceDynamiteHit = (consume: Cell): Hit => ({
    type: 'ProduceDynamite',
    produce: 'dynamite',
    consume,
    area: () => [consume]
})
export const ProduceResetHit = (consume: Cell): Hit => ({
    type: 'ProduceReset',
    produce: 'reset',
    consume,
    area: () => [consume]
})
export const ButtonMixHit = (): Hit => ({
    type: 'ButtonMix',
    produce: 'mix',
    consume: undefined,
    area: (model) => flatArray(model.game.cells)
})

// omitted: ProduceBlock, ButtonBlock, ButtonHorizontal, ButtonVertical, ButtonDynamite, ButtonReset, ConsumeMix, ProduceMix