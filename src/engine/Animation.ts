import {Container} from "pixi.js"
import gsap from "gsap"
type Timeline = gsap.core.Timeline

const animations: Map<Container, Timeline[]> = new Map()

gsap.core.Timeline.prototype.animate = function (...targets: Container[]): Timeline {
    for (const container of targets) {
        const timelines: Timeline[] = animations.get(container) ?? []
        timelines.push(this)
        animations.set(container, timelines)
    }
    return this
}

export function clearAnimations(...targets: Container[]) {
    for (const container of targets) {
        const timelines: Timeline[] = animations.get(container) ?? []
        for (const timeline of timelines) {
            timeline.kill()
        }
        animations.delete(container)
    }
}
