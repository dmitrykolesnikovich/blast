import {getSound, muteSounds, playSoundLoop, unmuteSounds} from "../engine"
import {Profile} from "../types/Profile"
import {
    backgroundMp3,
    streakResetMp3,
    streakUndefinedMp3,
    streakGroupMp3,
    streakMixMp3,
    downgradeMp3,
    coinsMp3,
    clickEnabledMp3,
    streakDynamiteMp3,
    dialogHideMp3,
    dialogShowMp3,
    streakVerticalOrHorizontalMp3,
    loseMp3,
    rainMp3,
    winMp3
} from "../../res"

const SOUNDS: string[] = [
    streakResetMp3,
    streakUndefinedMp3,
    streakGroupMp3,
    streakMixMp3,
    downgradeMp3,
    coinsMp3,
    clickEnabledMp3,
    streakDynamiteMp3,
    dialogHideMp3,
    dialogShowMp3,
    streakVerticalOrHorizontalMp3,
    loseMp3,
    rainMp3,
    winMp3
]

export function setupAudio(profile: Profile) {
    // settings
    if (profile.musicEnabled)
        enableMusic()
    else
        disableMusic()
    if (profile.soundEnabled)
        enableSound()
    else
        disableSound()

    // setup
    getSound(backgroundMp3).loop(true).volume(0.2)
    getSound(rainMp3).loop(true).volume(1)
    getSound(streakGroupMp3).volume(1)
    getSound(streakUndefinedMp3).volume(0.5)

    // default
    playSoundLoop(backgroundMp3)
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
