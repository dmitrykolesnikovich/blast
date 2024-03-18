import {DEG_TO_RAD} from "pixi.js"

export function randomInt(max: number): number {
    return Math.floor(Math.random() * max)
}

export function randomIntInRange(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// fixme quick and dirty
export function randomIntsUnique(max: number, count: number): number[] {
    const result: number[] = []
    while (result.length != count) {
        let int: number = randomInt(max)
        if (!result.includes(int)) {
            result.push(int)
        }
    }
    return result
}

export function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max)
}

export function radians(degrees: number): number {
    return degrees * DEG_TO_RAD
}