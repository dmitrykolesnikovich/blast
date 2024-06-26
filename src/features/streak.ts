import {EmptyForward, Forward} from "./shift"
import {GameModel} from "../game/model"
import {check, randomInt} from "../engine"
import {Cell} from "../types/Cell"
import {Hit} from "../types/Hit"
import {Level} from "../types/Level"
import {randomBlock} from "../types/Block"
import {Booster} from "../types/Booster"
import {insertStreak, pushStreak, Streak} from "../types/Streak"

export function initiateStreak(model: GameModel, hit: Hit): Forward {
    const hitArea: Cell[] = hit.area(model)

    // filter
    if (hit.type === 'ConsumeBlock' && hitArea.length < model.level.groupSize) return EmptyForward(hit)
    if (hit.produce !== undefined && hit.produce === hit.consume?.booster) return EmptyForward(hit)

    // action
    switch (hit.type) {
        case 'ProduceHorizontal':
        case 'ProduceVertical':
        case 'ProduceDynamite':
        case 'ProduceReset':
            check('hitArea.length === 1', hitArea.length === 1)
            return insertStreak(hit, ProduceBoosterStreak(hit.produce, hitArea[0]))

        case 'ConsumeHorizontal':
        case 'ConsumeVertical':
        case 'ConsumeDynamite':
        case 'ConsumeReset':
            return pushStreak(hit, RandomBlocksStreak(model.level, hitArea))

        case 'ConsumeBlock': {
            const {consume} = hit
            if (hitArea.length >= model.level.boosterSize) {
                const unselected: Cell[] = (hitArea.filter(cell => cell != consume))
                return {
                    hit: hit,
                    push: RandomBlocksStreak(model.level, unselected),
                    insert: ProduceBoosterStreak(['horizontal', 'vertical', 'dynamite', 'reset'][randomInt(0, 3)] as Booster, consume)
                }
            }
            return pushStreak(hit, RandomBlocksStreak(model.level, hitArea))
        }

        case 'ButtonMix':
            return pushStreak(hit, MixedBlocksStreak(hitArea))
    }
}

function ProduceBoosterStreak(produce: Booster, consume: Cell): Streak {
    return {
        from: [consume],
        to: [{
            row: consume.row,
            column: consume.column,
            block: undefined,
            booster: produce
        }]
    }
}

function RandomBlocksStreak(level: Level, hitArea: Cell[]): Streak {
    const {colorsCount} = level
    return {
        from: hitArea,
        to: hitArea.map(cell => ({
            row: cell.row,
            column: cell.column,
            block: randomBlock(colorsCount),
            booster: undefined
        }))
    }
}

function MixedBlocksStreak(hitArea: Cell[]): Streak {
    return {
        from: hitArea,
        to: [...hitArea].shuffle().map((cell, index) => {
            const {row, column} = hitArea[index]
            return {
                row,
                column,
                block: cell.block,
                booster: cell.booster,
                original: {
                    row: cell.row,
                    column: cell.column,
                },
            }
        })
    }
}
