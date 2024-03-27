import {getSound, muteSounds, unmuteSounds} from "../engine"
import {
    backgroundMp3,
    ballMp3,
    blockPressErrorMp3,
    blockPressMp3,
    bombMp3,
    buttonBuyMp3,
    buttonCoinsMp3,
    buttonMp3,
    colorBombMp3,
    dialogHideMp3,
    dialogShowMp3,
    dynamiteMp3,
    iceBreakMp3,
    loseMp3,
    rainMp3,
    whooshMp3,
    winMp3
} from "../../res"

const SOUNDS: string[] = [
    ballMp3,
    blockPressErrorMp3,
    blockPressMp3,
    bombMp3,
    buttonBuyMp3,
    buttonCoinsMp3,
    buttonMp3,
    colorBombMp3,
    dialogHideMp3,
    dialogShowMp3,
    dynamiteMp3,
    iceBreakMp3,
    loseMp3,
    rainMp3,
    whooshMp3,
    winMp3
]

export function setupAudio() {
    getSound(backgroundMp3).loop(true).volume(0.33)
}

export function disableMusic() {
    muteSounds(backgroundMp3)
}

export function enableMusic() {
    unmuteSounds(backgroundMp3)
}

export function disableSound() {
    muteSounds(...SOUNDS)
}

export function enableSound() {
    unmuteSounds(...SOUNDS)
}
