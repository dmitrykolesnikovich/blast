import {Container} from "pixi.js"
import gsap, {Back} from "gsap"
import {buttonDisabledMp3, buttonMp3} from "../../res"
import {clearAnimations, playSound} from "../engine"

export type Clickable = Container & { enabled: boolean, options: ClickOptions }

type ClickOptions = {
    checkbox?: boolean
    toggle?: boolean
    click?: ClickListener
}

export type ClickListener<T extends Clickable = any> = (button: T) => void

export function setupClickListener(button: Clickable) {
    button.eventMode = "dynamic"
    button.on("pointerdown", () => {
        clearAnimations(button)
        const {checkbox, toggle, click} = button.options
        if (toggle) {
            button.enabled = !button.enabled
        } else {
            // audio
            if (checkbox) {
                playSound(buttonMp3)
            } else {
                if (button.enabled) {
                    playSound(buttonMp3)
                } else {
                    playSound(buttonDisabledMp3)
                }
            }

            // click
            if (checkbox) {
                button.enabled = !button.enabled
            } else {
                gsap.timeline()
                    .to(button.scale, {x: 1.2, y: 1.08, duration: 0.1, ease: Back.easeOut})
                    .to(button.scale, {x: 1, y: 1, duration: 0.22, ease: Back.easeOut, onComplete: () => {
                        if (!checkbox && button.enabled) {
                            if (click) click(button)
                        }
                    }})
            }
        }
    })
}
