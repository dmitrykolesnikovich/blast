import {Assets, Spritesheet, Texture} from "pixi.js"
import {Environment} from "./Environment"
import {Sound} from "./Audio"

export function quickfixSpritesheetForProduction(spritesheet: Spritesheet) {
    for (const frame of Object.keys(spritesheet.data.frames)) {
        const key: string = `${window.location.href}${Environment.basePath}/${frame}`
        const texture: Texture = Assets.cache.get(frame) as Texture
        Assets.cache.set(key, texture)
    }
}

export function quickfixSoundForProduction(url: string, sound: Sound) {
    const key: string = `${window.location.href}${Environment.basePath}/${url}`
    Assets.cache.set(key, sound)
}
