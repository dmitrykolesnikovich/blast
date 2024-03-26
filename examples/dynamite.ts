import {bootstrap, context, startTimer, View, viewOf} from "../src/engine"
import {Graphics, Sprite, Texture} from "pixi.js"
import gsap, {Power2, Circ} from "gsap"
import {boosterDynamitePng, particlesGlitterPng, particlesShinePng} from "../res"
import Image from "../src/ui/views/Image"
import {Emitter, upgradeConfig} from "@pixi/particle-emitter"
import {emitParticles} from "../src/engine/Particles"

bootstrap(dynamite)

async function dynamite() {
    await context.loader.load([boosterDynamitePng, particlesGlitterPng, particlesShinePng])

    const dynamite: Sprite = new Image({
        foreground: boosterDynamitePng,
        anchor: {x: 0.5, y: 0.5},
        position: {x: 225, y: 600},
        size: {width: 130, height: 130}
    })
    emitParticles({
        pos: {
            x: 0,
            y: -25
        },
        alpha: {
            start: 1,
            end: 0
        },
        scale: {
            start: 0.05,
            end: 0.1,
            minimumScaleMultiplier: 1
        },
        color: {
            start: "#fdffdb",
            end: "#ffffff"
        },
        speed: {
            start: 50,
            end: 50,
            minimumSpeedMultiplier: 0.01
        },
        acceleration: {
            x: 0,
            y: 0
        },
        maxSpeed: 0,
        startRotation: {
            min: 0,
            max: 360
        },
        noRotation: false,
        rotationSpeed: {
            min: 0,
            max: 0
        },
        lifetime: {
            min: 0.7,
            max: 0.7
        },
        blendMode: "normal",
        frequency: 0.4,
        emitterLifetime: -1,
        maxParticles: 10,
        addAtBack: false,
        spawnType: "circle",
        spawnCircle: {
            x: 0,
            y: 0,
            r: 1
        }
    }, dynamite, particlesGlitterPng)
    emitParticles({
        alpha: {
            start: 0.19,
            end: 1
        },
        scale: {
            start: 0.1,
            end: 0.05,
            minimumScaleMultiplier: 1
        },
        color: {
            start: "#df396c",
            end: "#ffff3c"
        },
        speed: {
            start: 40,
            end: 410,
            minimumSpeedMultiplier: 1
        },
        acceleration: {
            x: 0,
            y: 300
        },
        maxSpeed: 100,
        startRotation: {
            min: 0,
            max: 360
        },
        noRotation: false,
        rotationSpeed: {
            min: 0,
            max: 0
        },
        lifetime: {
            min: 0.42,
            max: 0.42
        },
        blendMode: "normal",
        frequency: 0.05,
        emitterLifetime: -1,
        maxParticles: 30,
        pos: {
            x: 0,
            y: -25
        },
        addAtBack: false,
        spawnType: "circle",
        spawnCircle: {
            x: 0,
            y: 0,
            r: 20
        }
    }, dynamite, particlesShinePng)
    emitParticles({
        alpha: {
            start: 0.95,
            end: 0.65
        },
        scale: {
            start: 1,
            end: 1,
            minimumScaleMultiplier: 1
        },
        color: {
            start: "#fffdac",
            end: "#fffdac"
        },
        speed: {
            start: 1,
            end: 1,
            minimumSpeedMultiplier: 1
        },
        acceleration: {
            x: 0,
            y: 0
        },
        maxSpeed: 0,
        startRotation: {
            min: 0,
            max: 360
        },
        noRotation: false,
        rotationSpeed: {
            min: 0,
            max: 0
        },
        lifetime: {
            min: 1,
            max: 1
        },
        blendMode: "normal",
        frequency: 1,
        emitterLifetime: -1,
        maxParticles: 1,
        pos: {
            x: 0,
            y: -25
        },
        addAtBack: false,
        spawnType: "rect",
        spawnRect: {
            x: 0,
            y: 0,
            w: 1,
            h: 1
        }
    }, dynamite, particlesShinePng)

    gsap.timeline({repeat: -1})
        .to(dynamite.scale, {x: 1.05, y: 1.05, duration: 1, ease: Power2.easeInOut})
        .to(dynamite.scale, {x: 1, y: 1, duration: 1, ease: Power2.easeInOut})
    gsap.timeline({repeat: -1})
        .to(dynamite, {angle: 10, duration: 0.1, ease: Circ.easeInOut})
        .to(dynamite, {angle: -10, duration: 0.2, ease: Circ.easeInOut})
        .to(dynamite, {angle: 10, duration: 0.2, ease: Circ.easeInOut})
        .to(dynamite, {angle: -10, duration: 0.2, ease: Circ.easeInOut})
        .to(dynamite, {angle: 0, duration: 0.2, ease: Circ.easeInOut})

    context.layout.append(viewOf({width: 450, height: 800})
        .append(new Graphics().beginFill('black').drawRect(-2000, -2000, 4000, 4000).endFill())
        .append(dynamite)
    )
}
