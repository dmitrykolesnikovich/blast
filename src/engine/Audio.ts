import {Assets, extensions} from "pixi.js"
// @ts-ignore
import howler from 'howler-pixi-loader-middleware'
import {Howl} from "howler"

export type Sound = Howl

export function initializeAudio() {
    extensions.add(howler)
}

export function getSound(soundPath: string): Sound {
    return Assets.cache.get(soundPath) as Sound
}

export function playSound(soundPath: string) {
    getSound(soundPath).play()
}
