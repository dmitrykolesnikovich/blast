import LevelButton from "../ui/views/LevelButton"
import {IPointData} from "pixi.js"

export function getLevelGoal(level: number): number {
    return level * 10
}

export const LEVEL_BUTTON_PATH: IPointData[] = [
    {x: 130, y: 3950},
    {x: 105, y: 3890},
    {x: 112, y: 3828},
    {x: 172, y: 3784},
    {x: 255, y: 3730},
    {x: 224, y: 3676},
    {x: 176, y: 3647},
    {x: 140, y: 3609},
    {x: 110, y: 3561},
    {x: 143, y: 3506},
    {x: 195, y: 3472},
    {x: 240, y: 3440},
    {x: 286, y: 3400},
    {x: 302, y: 3344},
    {x: 290, y: 3290},
    {x: 269, y: 3247},
]
