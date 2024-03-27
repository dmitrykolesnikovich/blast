import {Assets, extensions} from "pixi.js"
// @ts-ignore
import howler from 'howler-pixi-loader-middleware'
import {Howl} from "howler"
import {ballMp3} from "../../res"

export type Sound = Howl

export function initializeAudio() {
    extensions.add(howler)
}

export function getSound(sound: string): Sound {
    return Assets.cache.get(sound) as Sound
}

export function playSound(sound: string) {
    getSound(sound).play()
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