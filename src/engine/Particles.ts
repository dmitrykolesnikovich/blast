import {Assets, BaseTexture, Container, Rectangle, Texture} from "pixi.js"
import {Emitter, EmitterConfigV1, EmitterConfigV2, EmitterConfigV3, upgradeConfig} from "@pixi/particle-emitter"
import {startTimer} from "./Timer"
import {range} from "./Library"

type ParticlesOptions = (EmitterConfigV1 | EmitterConfigV2) & {
    textures?: string | string[]
    rows?: number
    columns?: number
}

export function emitParticles(container: Container, options: ParticlesOptions) {
    const textures: string[] | undefined = (typeof options.textures === 'string') ? [options.textures] : options.textures
    const rows: number = options.rows ?? 1
    const columns: number = options.columns ?? 1
    const art: Texture[] | undefined = textures?.flatMap(texture => {
        const result: Array<Texture> = []
        const baseTexture: BaseTexture = (Assets.cache.get(texture) as Texture).baseTexture
        for (const row of range(0, rows - 1)) {
            for (const column of range(0, columns - 1)) {
                const width: number = baseTexture.width / columns
                const height: number = baseTexture.height / rows
                const x: number = column * width
                const y: number = row * height
                result.push(new Texture(baseTexture, new Rectangle(x, y, width, height)))
            }
        }
        return result
    })
    const config: EmitterConfigV3 = upgradeConfig(options, art)
    const emitter: Emitter = new Emitter(container, config)
    startTimer(({deltaTime}) => emitter.update(deltaTime))
    emitter.emit = true
}
