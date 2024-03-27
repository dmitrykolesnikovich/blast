import {Container, IPointData} from "pixi.js"
import gsap, {Back, Linear, Power2, Power3, Sine} from "gsap"

/**animation duration: 1.4*/
export function animateHeartBeat(target: Container) {
    gsap.timeline({repeat: -1})
        .animate(target)
        .to(target.scale, {x: 1.06, y: 1, duration: 0.35, ease: Back.easeOut})
        .to(target.scale, {x: 1.03, y: 1.03, duration: 0.42, ease: Power2.easeOut})
        .to(target.scale, {x: 1, y: 1, duration: 0.21, ease: Linear.easeIn})
}

export function animateRadialShine(...target: Container[]) {
    for (const container of target) {
        const startAngle: number = container.angle
        gsap.timeline({repeat: -1})
            .set(container, {angle: startAngle})
            .to(container, {angle: startAngle + 5, duration: 1.2, ease: Sine.easeInOut})
            .to(container, {angle: startAngle, duration: 1.2, ease: Sine.easeInOut})
        gsap.timeline({repeat: -1})
            .set(container, {alpha: 1})
            .to(container, {alpha: 0.5, duration: 1.1, ease: Sine.easeInOut})
            .to(container, {alpha: 1, duration: 1.1, ease: Sine.easeInOut})
    }
}

export function animatePointer(target: Container, direction: IPointData = {x: 0, y: 16}) {
    const ox: number = target.x
    const oy: number = target.y
    gsap.timeline({repeat: -1})
        .animate(target)
        .set(target, {x: ox - direction.x, y: oy - direction.y})
        .to(target, {x: ox, y: oy, duration: 1, ease: Power3.easeInOut})
        .to(target, {x: ox - direction.x, y: oy - direction.y, duration: 1.75, ease: Power2.easeInOut})

}
