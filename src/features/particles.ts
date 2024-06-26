import {ColorSource, Container, IPointData, ISize} from "pixi.js"
import {Emitter} from "@pixi/particle-emitter"
import {emitParticles} from "../engine/Particles"
import {
    particlesBlockPng,
    particlesRainPng
} from "../../res"

type ParticlesOptions = {
    container: Container
    position: IPointData
    size: ISize
    scale?: number,
    tint?: ColorSource
}

export function emitRain(options: ParticlesOptions): Emitter {
    const {container, position, size} = options
    return emitParticles(container, {
        textures: particlesRainPng,
        alpha: {
            start: 1,
            end: 0.05
        },
        scale: {
            start: 1,
            end: 0.2,
            minimumScaleMultiplier: 1
        },
        color: {
            start: "#ffffff",
            end: "#ffffff"
        },
        speed: {
            start: 100,
            end: 100,
            minimumSpeedMultiplier: 1
        },
        acceleration: {
            x: 0,
            y: 300
        },
        maxSpeed: 0,
        startRotation: {
            min: 90,
            max: 90
        },
        noRotation: true,
        rotationSpeed: {
            min: 0,
            max: 0
        },
        lifetime: {
            min: 2,
            max: 3
        },
        blendMode: "normal",
        frequency: 0.12,
        emitterLifetime: -1,
        maxParticles: 32,
        pos: {
            x: 0,
            y: 0,
        },
        addAtBack: false,
        spawnType: "rect",
        spawnRect: {
            x: position.x,
            y: position.y,
            w: size.width,
            h: size.height
        }
    })
}

export function emitBlast(options: ParticlesOptions): Emitter {
    const {container, position, size, scale = 1, tint = 'white'} = options
    return emitParticles(container, {
        textures: particlesBlockPng,
        rows: 2,
        columns: 2,
        "alpha": {
            "start": 1,
            "end": 0.1
        },
        "scale": {
            "start": 1 * scale,
            "end": 0.5 * scale,
            "minimumScaleMultiplier": 1
        },
        color: {
            start: tint.toString(16),
            end: tint.toString(16)
        },
        "speed": {
            "start": 500,
            "end": 2000,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 4000
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": -90 - 45,
            "max": -90 + 45
        },
        "noRotation": true,
        "rotationSpeed": {
            "min": 90,
            "max": 450
        },
        "lifetime": {
            "min": 0.6,
            "max": 0.6
        },
        "blendMode": "normal",
        "frequency": 0.0001,
        "emitterLifetime": 0.6,
        "maxParticles": 100,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "rect",
        spawnRect: {
            x: position.x - size.width / 2,
            y: position.y - size.height / 2,
            w: size.width,
            h: size.height
        }
    })
}