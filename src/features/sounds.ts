import {context, getSound} from "../engine"
import {backgroundMp3} from "../../res"

export function setupAudio() {
    getSound(backgroundMp3).loop(true).volume(0.33)
}
