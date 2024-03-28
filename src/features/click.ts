import {Container} from "pixi.js"
import gsap, {Back} from "gsap"
import {buttonDisabledMp3, buttonMp3} from "../../res"
import {clearAnimations, playSoundEffect} from "../engine"

export type Clickable = Container & { enabled: boolean, layout: ClickOptions }

type ClickOptions = {
    checkbox?: boolean
    toggle?: boolean
    click?: ClickListener
}

export type ClickListener<T extends Clickable = any> = (button: T) => void

export function setupClickListener(button: Clickable) {
    button.eventMode = "dynamic"
    button.on("pointerdown", (pointer) => {
        pointer.stopPropagation()
        clearAnimations(button)
        const {checkbox, toggle, click} = button.layout
        if (toggle) {
            button.enabled = !button.enabled
        } else {
            // audio
            if (checkbox) {
                playSoundEffect(buttonMp3)
            } else {
                if (button.enabled) {
                    playSoundEffect(buttonMp3)
                } else {
                    playSoundEffect(buttonDisabledMp3)
                }
            }

            // click
            if (checkbox) {
                button.enabled = !button.enabled
            }
            gsap.timeline()
                .to(button.scale, {x: 1.2, y: 1.08, duration: 0.1, ease: Back.easeOut})
                .to(button.scale, {x: 1, y: 1, duration: 0.22, ease: Back.easeOut, onComplete: () => {
                        if (!checkbox && button.enabled) {
                            if (click) click(button)
                        }
                    }})
        }
    })
}
