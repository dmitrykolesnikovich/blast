import {Container} from "pixi.js"
import gsap from "gsap"

const animations: WeakMap<Container, gsap.core.Timeline[]> = new WeakMap()

gsap.core.Timeline.prototype.animate = function (...targets: Container[]): gsap.core.Timeline {
    for (const container of targets) {
        const timelines: gsap.core.Timeline[] = animations.get(container) ?? []
        timelines.push(this)
        animations.set(container, timelines)
    }
    return this
}

export function clearAnimations(target: Container) {
    const timelines: gsap.core.Timeline[] = animations.get(target) ?? []
    for (const timeline of timelines) {
        timeline.kill()
    }
    animations.delete(target)
}
