import {ColorSource, IPointData, ISize, Point, Sprite, Texture} from "pixi.js";

type ImageOptions = {
    position?: IPointData,
    size: ISize,
    foreground?: string,
    anchor?: IPointData,
    tint?: ColorSource,
    visible?: boolean
}

export default class Image extends Sprite {

    constructor(options: ImageOptions) {
        super()
        const {position, size, foreground, anchor, tint, visible} = options
        this.texture = foreground ? Texture.from(foreground) : Texture.EMPTY
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

    set foreground(foreground: string) {
        this.texture = Texture.from(foreground)
    }

    set size(size: ISize) {
        this.width = size.width
        this.height = size.height
    }

}
