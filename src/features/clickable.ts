import {Container} from "pixi.js"
import gsap, {Back} from "gsap"
import {clearAnimations, delay, playSound} from "../engine"
import {clickDisabledMp3, clickEnabledMp3} from "../../res"

export type Clickable = Container & { enabled: boolean, layout: ClickableLayout }

type ClickableLayout = {
    checkbox?: boolean
    toggle?: boolean
    click?: ClickListener
    clickDelay?: number
    sound?: boolean
}

export type ClickListener<T extends Clickable = any> = (button: T) => void

export function setupClickable(button: Clickable) {
    button.eventMode = "dynamic"
    let previousClickCompleted: boolean = true
    button.on("pointerdown", (pointer) => {
        const {clickDelay = 0.22, sound = true} = button.layout
        pointer.stopPropagation()
        if (!previousClickCompleted) return
        clearAnimations(button)
        const {checkbox, toggle, click} = button.layout
        if (toggle) {
            button.enabled = !button.enabled
        } else {
            // audio
            if (sound) {
                if (checkbox) {
                    playSound(clickEnabledMp3)
                } else {
                    if (button.enabled) {
                        playSound(clickEnabledMp3)
                    } else {
                        playSound(clickDisabledMp3)
                    }
                }
            }

            // click
            if (checkbox) {
                button.enabled = !button.enabled
            }
            previousClickCompleted = false
            gsap.timeline()
                .to(button.scale, {x: 1.2, y: 1.08, duration: 0.1, ease: Back.easeOut})
                .to(button.scale, {
                    x: 1, y: 1, duration: 0.22, ease: Back.easeOut, onComplete: () => {
                        previousClickCompleted = true
                    }
                })
            delay(clickDelay, () => {
                if (!checkbox && button.enabled) {
                    if (click) {
                        click(button)
                    }
                }
            })
        }
    })
}
