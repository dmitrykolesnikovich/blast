import {Assets, Spritesheet, Texture} from "pixi.js"
import {Environment} from "./Environment"

export function quickfixSpritesheetForProduction(spritesheet: Spritesheet) {
    for (const frame of Object.keys(spritesheet.data.frames)) {
        const key: string = `${window.location.href}${Environment.basePath}/${frame}`
        const texture: Texture = Assets.cache.get(frame) as Texture
        Assets.cache.set(key, texture)
    }
}
