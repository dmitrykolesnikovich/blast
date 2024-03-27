import {Container} from "pixi.js"
import {bootstrap, context, delay, startTimer} from "../src/engine"
import Image from "../src/ui/views/Image"
import {emitParticles, ParticlesOptions} from "../src/engine/Particles"
import Layer from "../src/ui/views/Layer"
import {redColor} from "../src/features/style"
import {
    blockPng,
    particlesBlockPng
} from "../res"

bootstrap(score)

async function score() {
    const COLOR: string = redColor
    await context.loader.load([particlesBlockPng])
    const block: Image = Layer({size: {width: 450, height: 800}}).addChild(new Image({
        position: {x: 225, y: 400},
        anchor: {x: 0.5, y: 0.5},
        size: {width: 171 / 3, height: 192 / 3},
        foreground: blockPng,
        tint: COLOR
    }))
    const layer: Container = Layer({position: {x: 225, y: 400}, size: {width: 450, height: 800}})
    const particles: ParticlesOptions = {
        textures: particlesBlockPng,
        rows: 2,
        columns: 2,
        "alpha": {
            "start": 1,
            "end": 0.9
        },
        "scale": {
            "start": 1.4,
            "end": 0.2,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": COLOR,
            "end": COLOR
        },
        "speed": {
            "start": 600,
            "end": 600,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 3600
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": -90 - 45,
            "max": -90 + 45
        },
        "noRotation": true,
        "rotationSpeed": {
            "min": 45,
            "max": 360
        },
        "lifetime": {
            "min": 0.7,
            "max": 0.7
        },
        "blendMode": "normal",
        "frequency": 0.001,
        "emitterLifetime": 0.5,
        "maxParticles": 6,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "rect",
        "spawnRect": {
            "x": -16,
            "y": -16 - 16 - 16 - 16,
            "w": 32 - 8 + 12 + 12,
            "h": 48 + 12 + 12
        }
    }
    block.eventMode = 'dynamic'
    block.on('pointerdown', () => {
        block.visible = false
        delay(0.7, () => block.visible = true)
        emitParticles(layer, particles)
    })
}
