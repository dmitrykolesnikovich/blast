import {Container, IPointData, ISize, Rectangle, Texture} from "pixi.js"
import {Emitter, upgradeConfig} from "@pixi/particle-emitter"
import {startTimer} from "../engine"
import {
    particlesRainPng
} from "../../res"

type ParticlesOptions = {
    container: Container
    position: IPointData
    size: ISize
}

export function rain(options: ParticlesOptions) {
    const {container, position, size} = options
    const bounds: Rectangle = container.getLocalBounds()
    const rain: Emitter = new Emitter(container,
        upgradeConfig({
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
            frequency: 0.25,
            emitterLifetime: -1,
            maxParticles: 15,
            pos: {
                x: 0,
                y: 0,
            },
            addAtBack: false,
            spawnType: "rect",
            spawnRect: {
                x: bounds.left + position.x,
                y: bounds.top + position.y,
                w: size.width,
                h: size.height
            }
        }, [Texture.from(particlesRainPng)]))
    startTimer(({deltaTime}) => rain.update(deltaTime))
    rain.emit = true
}