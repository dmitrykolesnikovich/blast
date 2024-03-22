import {ColorSource, Container, IPointData, ISize, Sprite, Texture} from "pixi.js";

type ButtonOptions = {
    position: IPointData,
    size: ISize,
    image: string,
    anchor?: IPointData,
    tint?: ColorSource,
    background: string,
    backgroundOff?: string,
    backgroundSize?: ISize,
}

export default class Button extends Container {
    constructor(options: ButtonOptions) {
        super()
        const {position, size, image, anchor, tint, background, backgroundOff, backgroundSize} = options
        this.position = position

        // background
        {
            const sprite: Sprite = this.addChild(new Sprite(Texture.from(background)))
            const actualSize = backgroundSize ?? size
            sprite.width = actualSize.width
            sprite.height = actualSize.height
            if (anchor) {
                sprite.anchor.copyFrom(anchor)
            }
            if (tint) {
                sprite.tint = tint
            }
        }

        // foreground
        {
            const sprite: Sprite = this.addChild(new Sprite(Texture.from(image)))
            sprite.width = size.width
            sprite.height = size.height
            if (anchor) {
                sprite.anchor.copyFrom(anchor)
            }
            if (tint) {
                sprite.tint = tint
            }
        }
    }
}
