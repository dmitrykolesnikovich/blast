import {Container} from "pixi.js"
import gsap, {Back, Linear, Power2, Sine} from "gsap"

/**animation duration: 1.4*/
export function animateHeartBeat(target: Container) {
    gsap.timeline({repeat: -1})
        .animate(target)
        .to(target.scale, {x: 1.06, y: 1, duration: 0.5, ease: Back.easeOut})
        .to(target.scale, {x: 1.03, y: 1.03, duration: 0.6, ease: Power2.easeOut})
        .to(target.scale, {x: 1, y: 1, duration: 0.3, ease: Linear.easeIn})
}

export function animateRadialShine(...target: Container[]) {
    for (const container of target) {
        const startAngle: number = 0
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
