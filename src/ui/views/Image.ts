import {ColorSource, IPointData, ISize, Point, Sprite, Texture} from "pixi.js"
import Label from "./Label"

type ImageOptions = {
    position?: IPointData,
    size: ISize,
    foreground?: string,
    anchor?: IPointData,
    tint?: ColorSource,
    visible?: boolean
    angle?: number
    alpha?: number
    label?: Label
}

export default class Image extends Sprite {

    private readonly options: ImageOptions

    constructor(options: ImageOptions) {
        super()
        const {position, size, foreground, anchor, tint, visible, angle, alpha, label} = this.options = options
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
        if (angle !== undefined) {
            this.angle = angle
        }
        if (alpha !== undefined) {
            this.alpha = alpha
        }
        if (label !== undefined) {
            this.addChild(label)
        }
    }

    set foreground(foreground: string) {
        this.texture = Texture.from(foreground)
    }

    set size(size: ISize) {
        this.width = size.width
        this.height = size.height
    }

    set text(text: string | number) {
        const label: Label | undefined = this.options.label
        if (label !== undefined) {
            label.text = text
        }
    }

}
