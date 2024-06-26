import {context, playSound, View} from "../engine"
import gsap from "gsap"
import {Graphics} from "pixi.js"
import {dialogHideMp3, dialogShowMp3} from "../../res"

export function animateCurtain(complete: Function) {
    curtain.background.alpha = 0
    context.layout.append(curtain)
    gsap.timeline()
        .to(curtain.background, {
            alpha: 1,
            delay: 0.12,
            duration: 0.5,
            onComplete: () => {
                complete()
            }
        })
        .to(curtain.background, {
            alpha: 0,
            duration: 0.95,
            onComplete: () => {
                hideCurtain()
            }
        })
}

export function showCurtain() {
    curtain.background.alpha = 0.5
    context.layout.append(curtain)
}

export function hideCurtain() {
    context.layout.remove(curtain)
}

/*internals*/

class Curtain extends View {

    readonly background: Graphics = new Graphics().beginFill('black').drawRect(-2000, -2000, 4000, 4000).endFill()

    constructor() {
        super({width: 450, height: 800})
        this.layout = {
            background: this.background
        }
        this.background.eventMode = 'static'
    }

}

const curtain: Curtain = new Curtain()