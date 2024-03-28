import {ColorSource, IPointData, ISize, Point, Sprite, Texture} from "pixi.js"
import Label from "./Label"
import {adapt, Adaptive} from "../../engine"

type ImageLayout = {
    position: IPointData,
    size: ISize,
    foreground?: string,
    anchor?: IPointData,
    tint?: ColorSource,
    visible?: boolean
    angle?: number
    alpha?: number
    label?: Label
    fillParent?: boolean
}

export default class Image extends Sprite {

    readonly layout: Adaptive<ImageLayout>

    constructor(layout: ImageLayout) {
        super()
        const {position, size, foreground, anchor, tint, visible, angle, alpha, label, fillParent} = this.layout = adapt(layout)
        this.texture = foreground ? Texture.from(foreground) : Texture.EMPTY
        this.position = position
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
        if (fillParent !== undefined) {

        }
    }

    set foreground(foreground: string) {
        this.texture = Texture.from(foreground)
    }

    set size(size: ISize) {
        this.width = size.width
        this.height = size.height
    }

    get size(): ISize {
        return this.layout.size
    }

    set text(text: string | number) {
        const label: Label | undefined = this.layout.label
        if (label !== undefined) {
            label.text = text
        }
    }

}
