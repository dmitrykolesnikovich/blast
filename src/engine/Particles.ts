import {Assets, BaseTexture, Container, Rectangle, Texture} from "pixi.js"
import {Emitter, EmitterConfigV1, EmitterConfigV2, EmitterConfigV3, upgradeConfig} from "@pixi/particle-emitter"
import {startTimer, Timer} from "./Timer"
import {range} from "./Library"
import {bindAction} from "./Reflection"

export type ParticlesOptions = (EmitterConfigV1 | EmitterConfigV2) & {
    textures?: string | string[]
    rows?: number
    columns?: number
}

export function emitParticles(container: Container, options: ParticlesOptions) {
    const texturePaths: string[] | undefined = (typeof options.textures === 'string') ? [options.textures] : options.textures
    const rows: number = options.rows ?? 1
    const columns: number = options.columns ?? 1
    const art: Texture[] | undefined = texturePaths?.flatMap(texturePath => {
        const result: Array<Texture> = []
        const texture: Texture = Assets.cache.get(texturePath) as Texture
        for (const row of range(0, rows - 1)) {
            for (const column of range(0, columns - 1)) {
                const frame: Rectangle = texture.frame
                const width: number = frame.width / columns
                const height: number = frame.height / rows
                const x: number = frame.x + column * width
                const y: number = frame.y + row * height
                result.push(new Texture(texture.baseTexture, new Rectangle(x, y, width, height)))
            }
        }
        return result
    })
    const config: EmitterConfigV3 = upgradeConfig(options, art)
    const emitter: Emitter = new Emitter(container, config)
    const emitterLifetime: number = Math.min(emitter.emitterLifetime, emitter.maxLifetime)
    const timer: Timer = startTimer((timer) => {
        if (timer.totalTime >= emitterLifetime && emitterLifetime !== -1) {
            emitter.emit = false
            emitter.destroy()
        } else {
            emitter.emit = true
            emitter.update(timer.deltaTime)
        }
    })
    emitter.destroy = bindAction(emitter.destroy.bind(emitter), () => {
        timer.stop()
    })
    return emitter
}
