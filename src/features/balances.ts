import {Hit} from "../types/Hit"
import {Cell, initCells} from "../types/Cell"
import {randomBlock} from "../types/Block"
import {Balance} from "../types/Balance"
import {clamp} from "../engine"
import {Grid} from "../types/Grid"

export const PRODUCTION_BALANCE: Balance = {
    cells: (level) => initCells(gridOf(level), (row, column) => ({row, column, block: randomBlock(colorsCountOf(level))})),
    grid: (level) => gridOf(level),
    colorsCount: (level) => colorsCountOf(level),
    groupSize: () => 2,
    mixTries: () => 2,
    goal: (level) => 80 + level * 40,
    moves: (level) => 20 + level * 5,
    score: (hit: Hit, scored: Cell[]) => {
        switch (hit.type) {
            case 'ConsumeBlock':
                return scored.length
            case 'ConsumeHorizontal':
            case 'ConsumeVertical':
                return scored.length + 2
            case 'ConsumeDynamite':
                return scored.length + 4
            case 'ConsumeReset':
                return 16
            case 'ProduceHorizontal':
            case 'ProduceVertical':
            case 'ProduceDynamite':
            case 'ProduceReset':
            case 'ButtonMix':
                return 0
        }
    },
    coins: (level) => 25 + level * 10,
    boosterSize: (level) => clamp(colorsCountOf(level), 3, 5),
    price: (booster) => BOOSTER_PRICES[booster]
}

function gridOf(level: number): Grid {
    const size: number = clamp(colorsCountOf(level) + 1, 5, 8)
    return {rows: size, columns: size}
}

function colorsCountOf(level: number): number {
    return clamp(Math.floor(4 + level / 2), 4, 9)
}

/*development*/

export const PROVOKE_MIX_BOOSTER_BALANCE: Balance = {
    cells: () => initCells({rows: 5, columns: 5}, (row, column) => ({row, column, block: randomBlock(5)})),
    grid: () => ({rows: 5, columns: 5}),
    colorsCount: () => 9,
    groupSize: () => 2,
    mixTries: () => 1,
    goal: () => 80,
    moves: () => 30,
    score: (hit: Hit, scored: Cell[]) => {
        switch (hit.type) {
            case 'ConsumeBlock':
            case 'ConsumeHorizontal':
            case 'ConsumeVertical':
            case 'ConsumeDynamite':
            case 'ConsumeReset':
                return scored.length
            case 'ProduceHorizontal':
            case 'ProduceVertical':
            case 'ProduceDynamite':
            case 'ProduceReset':
            case 'ButtonMix':
                return 0
        }
    },
    coins: () => 25,
    boosterSize: () => 5,
    price: (booster) => BOOSTER_PRICES[booster]
}

const BOOSTER_PRICES = {
    'vertical': 5,
    'horizontal': 5,
    'dynamite': 10,
    'reset': 15,
    'mix': 0
}
