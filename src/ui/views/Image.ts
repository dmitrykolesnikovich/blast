import {ColorSource, IPointData, ISize, Point, Sprite, Texture} from "pixi.js";

type SpriteOptions = {
    position?: IPointData,
    size: ISize,
    image: string,
    anchor?: IPointData,
    tint?: ColorSource,
    visible?: boolean
}

export default class Image extends Sprite {

    constructor(options: SpriteOptions) {
        super()
        const {position, size, image, anchor, tint, visible} = options
        this.texture = Texture.from(image)
        this.position = position ?? new Point()
        this.width = size.width
        this.height = size.height
        if (anchor !== undefined) {
            this.anchor.copyFrom(anchor)
        }
        if (tint !== undefined) {
            this.tint = tint
        }
        if (visible !== undefined) {
            this.visible = visible
        }
    }

}
