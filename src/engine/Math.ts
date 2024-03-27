import {DEG_TO_RAD} from "pixi.js"

/** inclusive range */
export function randomInt(min: number, max: number): number {
    const int: number = min + Math.random() * (max + 1 - min)
    return Math.floor(int)
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
}

export function radians(degrees: number): number {
    return degrees * DEG_TO_RAD
}