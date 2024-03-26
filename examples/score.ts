import {bootstrap, context, startTimer, View, viewOf} from "../src/engine"
import {Container, Graphics, Sprite, Texture} from "pixi.js"
import gsap, {Power2, Circ} from "gsap"
import {boosterDynamitePng, particlesBlockRedPng, particlesGlitterPng, particlesShinePng} from "../res"
import Image from "../src/ui/views/Image"
import {Emitter, upgradeConfig} from "@pixi/particle-emitter"
import {emitParticles} from "../src/engine/Particles"
import Layer from "../src/ui/views/Layer"

bootstrap(score)

async function score() {
    await context.loader.load([particlesBlockRedPng])
    const particles: View = context.layout.append(Layer({
        position: {x: 225, y: 400},
        size: {width: 450, height: 800}
    }))
    emitParticles(particles.container, {
        textures: particlesBlockRedPng,
        rows: 2,
        columns: 1,
        alpha: {
            start: 1,
            end: 0.06
        },
        scale: {
            start: 1,
            end: 1,
            minimumScaleMultiplier: 1
        },
        color: {
            start: "#ffffff",
            end: "#ffffff"
        },
        speed: {
            start: 1,
            end: 1,
            minimumSpeedMultiplier: 1
        },
        acceleration: {
            x: 0,
            y: 400
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
        frequency: 1,
        emitterLifetime: -1,
        maxParticles: 25,
        pos: {
            x: 0,
            y: 0
        },
        addAtBack: false,
        spawnType: "rect",
        spawnRect: {
            x: -200,
            y: -5,
            w: 400,
            h: 10
        }
    })
}
