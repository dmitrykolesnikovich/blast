import {check, randomInt, TODO} from "../engine"
import {ColorSource} from "pixi.js"

export type Block = ColorSource

export function randomBlock(colorCount: number): Block {
    check('colorCount <= COLOR_SCHEME.length', colorCount <= COLOR_SCHEME.length)
    const index: number = randomInt(0, colorCount - 1)
    const block: Block = COLOR_SCHEME[index]
    return block
}

/*internals*/

const COLOR_SCHEME: Block[] = [
    '#f23856', // 1. красный
    '#56f20f', // 2. зеленый
    '#56adf2', // 3. синий
    '#f3b80a', // 4. желтый
    '#a780e0', // 5. фиолетовый
    '#80e0a7', // 6. бирюзовый
    '#ed1bc8', // 7. малиновый
    '#f099ba', // 8. розовый
    '#d56749', // 9. коричневый
]
