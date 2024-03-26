import {Container, Texture} from "pixi.js"
import {Emitter, EmitterConfigV1, EmitterConfigV2, EmitterConfigV3, upgradeConfig} from "@pixi/particle-emitter"
import {startTimer} from "./Timer"

export function emitParticles(particles: EmitterConfigV2 | EmitterConfigV1, container: Container, ...textures: string[]) {
    const emitter: Emitter = new Emitter(container, upgradeConfig(particles, textures.map(texture => Texture.from(texture))))
    startTimer(({deltaTime}) => emitter.update(deltaTime))
    emitter.emit = true
}
