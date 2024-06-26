import {ColorSource, Container, IPointData, ISize, Rectangle, Sprite, Texture} from "pixi.js"
import gsap, {Sine} from "gsap"
import Label from "./Label"
import Image from "./Image"
import {ClickListener, setupClickable} from "../../features/clickable"

export type ButtonLayout = {
    position: IPointData
    size: ISize
    foreground?: string
    anchor?: IPointData
    tint?: ColorSource
    background?: string
    backgroundAnchor?: IPointData
    backgroundSize?: ISize
    backgroundDisabled?: string
    checkbox?: boolean
    toggle?: boolean,
    click?: ClickListener
    clickDelay?: number
    enabled?: boolean,
    label?: Label
    icons?: Array<Image>
    sound?: boolean
}

export default class Button extends Container {

    readonly layout: ButtonLayout
    #enabled: boolean
    private backgroundSprite: Sprite = this.addChild(new Sprite())
    private foregroundSprite: Sprite = this.addChild(new Sprite())

    constructor(layout: ButtonLayout) {
        super()

        function setupSprite(sprite: Sprite, size: ISize, anchor?: IPointData, tint?: ColorSource, image?: string) {
            if (image) {
                sprite.texture = Texture.from(image)
            }
            sprite.width = size.width
            sprite.height = size.height
            if (anchor) {
                sprite.anchor.copyFrom(anchor)
            }
            if (tint) {
                sprite.tint = tint
            }
        }

        const {position, size, foreground, backgroundAnchor, anchor, tint, backgroundSize, enabled = true, label, icons} = this.layout = layout
        setupClickable(this)
        this.position = position
        setupSprite(this.backgroundSprite, backgroundSize ?? size, backgroundAnchor ?? anchor, tint)
        setupSprite(this.foregroundSprite, size, anchor, undefined, foreground)
        if (label) {
            this.addChild(label)
        }
        if (icons) {
            icons.forEach(icon => this.addChild(icon))
        }
        this.enabled = enabled
    }

    set enabled(enabled: boolean) {
        const firstTime: boolean = this.#enabled === undefined
        const changed: boolean = this.#enabled !== enabled
        this.#enabled = enabled

        const {background, backgroundDisabled, checkbox, toggle, click, size} = this.layout
        this.backgroundImage = enabled ? background : (backgroundDisabled ?? background)

        // animation
        if (toggle) {
            const bounds: Rectangle = this.backgroundSprite.getLocalBounds()
            const padding: number = (this.backgroundSprite.height - size.height) * 2
            const positionX: number = (enabled ? bounds.right - padding : bounds.left + padding) * this.backgroundSprite.scale.x
            const anchorX: number = enabled ? 1 : 0
            if (firstTime) {
                this.foregroundSprite.anchor.x = anchorX
                this.foregroundSprite.x = positionX
            } else {
                gsap.timeline()
                    .to(this.foregroundSprite.anchor, {x: anchorX, duration: 0.12, ease: Sine.easeInOut})
                gsap.timeline()
                    .to(this.foregroundSprite, {x: positionX, duration: 0.12, ease: Sine.easeInOut})
            }
        }

        // click
        if (!firstTime && changed) {
            if (checkbox || toggle) {
                if (click) {
                    click(this)
                }
            }
        }
    }

    get enabled(): boolean {
        return this.#enabled
    }

    /*internals*/

    private set backgroundImage(backgroundImage: string | undefined) {
        if (backgroundImage !== undefined) {
            this.backgroundSprite.texture = Texture.from(backgroundImage)
        } else {
            this.backgroundSprite.texture = Texture.EMPTY
        }
    }

    private set foregroundImage(backgroundImage: string | undefined) {
        if (backgroundImage !== undefined) {
            this.backgroundSprite.texture = Texture.from(backgroundImage)
        } else {
            this.backgroundSprite.texture = Texture.EMPTY
        }
    }

}
