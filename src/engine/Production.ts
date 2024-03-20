import {Assets, Spritesheet} from "pixi.js"
import {Environment} from "./Environment"

export function quickfixSpritesheetForProduction(asset: Spritesheet) {
    for (const frame of Object.keys(asset.data.frames)) {
        const key = `${window.location.href}${Environment.basePath}/${frame}`
        const value = Assets.cache.get(frame)
        Assets.cache.set(key, value)
    }
}
