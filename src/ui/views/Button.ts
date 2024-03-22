import {ColorSource, Container, IPointData, ISize, Sprite, Texture} from "pixi.js"

type ButtonClickListener = (button: Button) => void

type ButtonOptions = {
    position: IPointData
    size: ISize
    image: string
    anchor?: IPointData
    tint?: ColorSource
    background: string
    backgroundDisabled?: string
    backgroundSize?: ISize
    checkbox?: boolean
    click?: ButtonClickListener
    enabled?: boolean
}

export default class Button extends Container {

    readonly options: ButtonOptions
    private _isEnabled: boolean
    private backgroundSprite: Sprite = this.addChild(new Sprite())
    private foregroundSprite: Sprite = this.addChild(new Sprite())

    constructor(options: ButtonOptions) {
        super()
        this.options = options

        function setupButtonClickListener(button: Button) {
            button.eventMode = "dynamic"
            button.on("pointerdown", () => {
                const {checkbox, click} = button.options
                if (checkbox) {
                    button.enabled = !button.enabled
                } else if (button.enabled) {
                    if (click) click(button)
                }
            })
        }

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

        const {position, size, image, anchor, tint, backgroundSize, enabled = true} = options
        setupButtonClickListener(this)
        this.position = position
        setupSprite(this.backgroundSprite, backgroundSize ?? size, anchor, tint)
        setupSprite(this.foregroundSprite, size, anchor, tint, image)
        this.enabled = enabled
    }

    set enabled(enabled: boolean) {
        const firstTime: boolean = this._isEnabled === undefined
        this._isEnabled = enabled

        const {background, backgroundDisabled, checkbox, click} = this.options
        this.backgroundImage = enabled ? background : backgroundDisabled

        if (!firstTime && checkbox) {
            if (click) click(this)
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

}
