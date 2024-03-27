import {Container} from "pixi.js"
import gsap, {Back, Elastic} from "gsap"
import {buttonMp3} from "../../res"
import {playSound} from "../engine"

type Clickable = Container & { enabled: boolean, options: ClickOptions }

type ClickOptions = {
    checkbox?: boolean
    toggle?: boolean
    click?: ClickListener
}

export type ClickListener<T extends Clickable = any> = (button: T) => void

export function setupClickListener(button: Clickable) {
    button.eventMode = "dynamic"
    button.on("pointerdown", () => {
        const {checkbox, toggle, click} = button.options
        if (checkbox || toggle) {
            button.enabled = !button.enabled
        } else if (button.enabled) {
            gsap.timeline()
                .to(button.scale, {x: 1.2, y: 1.08, duration: 0.1, ease: Back.easeOut})
                .to(button.scale, {x: 1, y: 1, duration: 0.22, ease: Back.easeOut, onComplete: click})
            playSound(buttonMp3)
        }
    })
}
