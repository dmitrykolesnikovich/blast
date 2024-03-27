import {Assets, extensions} from "pixi.js"
// @ts-ignore
import howler from 'howler-pixi-loader-middleware'
import {Howl} from "howler"

export type Sound = Howl

const loops: Map<string, number> = new Map()

export function initializeAudio() {
    extensions.add(howler)
}

export function getSound(sound: string): Sound {
    return Assets.cache.get(sound) as Sound
}

export function playSoundEffect(sound: string) {
    getSound(sound).play()
}

export function playSoundLoop(sound: string) {
    if (!getSound(sound).playing()) {
        getSound(sound).play()
    }
}

export function muteSounds(...sounds: string[]) {
    for (const sound of sounds) {
        getSound(sound).mute(true)
    }
}

export function unmuteSounds(...sounds: string[]) {
    for (const sound of sounds) {
        getSound(sound).mute(false)
    }
}
