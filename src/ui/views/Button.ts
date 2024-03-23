import {ColorSource, Container, IPointData, ISize, Rectangle, Sprite, Texture} from "pixi.js"
import gsap from "gsap";
import Label from "./Label";
import {ClickListener, setupClickListener} from "../../features/click";


export type ButtonOptions = {
    position: IPointData
    size: ISize
    foreground?: string
    anchor?: IPointData
    tint?: ColorSource
    background?: string
    backgroundDisabled?: string
    backgroundSize?: ISize
    checkbox?: boolean
    toggle?: boolean,
    click?: ClickListener
    enabled?: boolean,
    label?: Label
}

export default class Button extends Container {

    readonly options: ButtonOptions
    private _isEnabled: boolean
    private backgroundSprite: Sprite = this.addChild(new Sprite())
    private foregroundSprite: Sprite = this.addChild(new Sprite())

    constructor(options: ButtonOptions) {
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

        const {position, size, foreground, anchor, tint, backgroundSize, enabled = true, label} = this.options = options
        setupClickListener(this)
        this.position = position
        setupSprite(this.backgroundSprite, backgroundSize ?? size, anchor, tint)
        setupSprite(this.foregroundSprite, size, anchor, tint, foreground)
        if (label) {
            this.addChild(label)
        }
        this.enabled = enabled
    }

    set enabled(enabled: boolean) {
        const firstTime: boolean = this._isEnabled === undefined
        this._isEnabled = enabled

        const {background, backgroundSize, backgroundDisabled, checkbox, toggle, click, size} = this.options
        this.backgroundImage = enabled ? background : (backgroundDisabled ?? background)
        if (toggle) {
            const bounds: Rectangle = this.backgroundSprite.getLocalBounds();
            const padding: number = (this.backgroundSprite.height - size.height) * 2
            const positionX: number = (enabled ? bounds.right - padding : bounds.left + padding) * this.backgroundSprite.scale.x
            const anchorX: number = enabled ? 1 : 0
            if (firstTime) {
                this.foregroundSprite.anchor.x = anchorX
                this.foregroundSprite.x = positionX
            } else {
                gsap.timeline({ease: 'sine.inOut'})
                    .to(this.foregroundSprite.anchor, {x: anchorX, duration: 0.22})
                gsap.timeline({ease: 'sine.inOut'})
                    .to(this.foregroundSprite, {x: positionX, duration: 0.22})
            }
        }
        if (!firstTime) {
            if (checkbox) {
                if (click) click(this)
            }
            if (toggle) {

                if (click) click(this)
            }
        }
    }

    get enabled(): boolean {
        return this._isEnabled
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
