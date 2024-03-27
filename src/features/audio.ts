import {Assets} from "pixi.js"

export function playSound(sound: string) {
    const howl: Howl = Assets.cache.get(sound) as Howl
    howl.play()
}
