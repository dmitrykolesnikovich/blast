import {ColorSource} from "pixi.js"

export class Environment {
    static basePath: string = 'res'
    static isDebugEnabled: boolean = false
    static cacheAwareDuration: number = 0.2
    static background: ColorSource = 'white'
    static app: HTMLDivElement
    static loader: HTMLDivElement | null
    static canvas: HTMLCanvasElement
}
