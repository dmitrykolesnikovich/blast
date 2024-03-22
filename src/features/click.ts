import {Container} from "pixi.js"

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
            if (click) click(button)
        }
    })
}
