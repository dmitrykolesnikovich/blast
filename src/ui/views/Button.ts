import {ColorSource, Container, IPointData, ISize, Sprite, Texture} from "pixi.js";

type ButtonOptions = {
    position: IPointData,
    size: ISize,
    image: string,
    anchor?: IPointData,
    tint?: ColorSource,
    background: string,
    backgroundDisabled?: string,
    backgroundSize?: ISize,
    enabled?: boolean
}

export default class Button extends Container {

    private readonly options: ButtonOptions
    private _isEnabled: boolean
    private backgroundSprite: Sprite = this.addChild(new Sprite())
    private foregroundSprite: Sprite = this.addChild(new Sprite())

    constructor(options: ButtonOptions) {
        super()
        this.options = options

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
        this.position = position
        setupSprite(this.backgroundSprite, backgroundSize ?? size, anchor, tint)
        setupSprite(this.foregroundSprite, size, anchor, tint, image)
        this.enabled = enabled
    }

    set enabled(enabled: boolean) {
        this._isEnabled = enabled

        const {background, backgroundDisabled} = this.options
        this.backgroundImage = enabled ? background : backgroundDisabled
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
