import {ColorSource, Container, IPointData, ISize, Sprite, Texture} from "pixi.js"
import Label from "./Label"
import {adapt, Adaptive, AdaptiveElement, Direction, flipSpriteHorizontally, Orientation, setupAdaptiveContainerLayout} from "../../engine"

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
    fill?: Orientation
    gravity?: Direction
    background?: string
    backgroundAnchor?: IPointData
    backgroundSize?: ISize
    flipX?: boolean
}

export default class Image extends Container implements AdaptiveElement {

    readonly layout: Adaptive<ImageLayout>
    readonly foregroundContainer: Container
    readonly foregroundSprite: Sprite
    readonly backgroundSprite: Sprite

    constructor(layout: ImageLayout) {
        super()
        const {position, size, foreground, anchor, tint, visible, angle, alpha, label, background, backgroundAnchor, backgroundSize, flipX} = this.layout = adapt(layout)
        this.position = position
        if (visible !== undefined) {
            this.visible = visible
        }
        if (angle !== undefined) {
            this.angle = angle
        }
        if (alpha !== undefined) {
            this.alpha = alpha
        }

        // background
        this.backgroundSprite = this.addChild(new Sprite())
        this.backgroundSprite.texture = background ? Texture.from(background) : Texture.EMPTY
        this.backgroundSprite.width = (backgroundSize ?? size).width
        this.backgroundSprite.height = (backgroundSize ?? size).height
        if (backgroundAnchor !== undefined) {
            this.backgroundSprite.anchor.copyFrom(backgroundAnchor)
        }
        if (tint !== undefined) {
            this.backgroundSprite.tint = tint
        }
        if (flipX !== undefined) {
            flipSpriteHorizontally(this.backgroundSprite)
        }

        // foreground
        this.foregroundContainer = this.addChild(new Container())
        this.foregroundSprite = this.foregroundContainer.addChild(new Sprite())
        this.foregroundSprite.texture = foreground ? Texture.from(foreground) : Texture.EMPTY
        this.foregroundSprite.width = size.width
        this.foregroundSprite.height = size.height
        if (anchor !== undefined) {
            this.foregroundSprite.anchor.copyFrom(anchor)
        }
        if (tint !== undefined) {
            this.foregroundSprite.tint = tint
        }
        if (flipX !== undefined) {
            flipSpriteHorizontally(this.foregroundSprite)
        }

        // text
        if (label !== undefined) {
            this.foregroundSprite.addChild(label) // quickfix todo improve
        }
    }

    set foreground(foreground: string) {
        this.foregroundSprite.texture = Texture.from(foreground)
    }

    set size(size: ISize) {
        this.backgroundSprite.width = size.width
        this.backgroundSprite.height = size.height
        this.foregroundSprite.width = size.width
        this.foregroundSprite.height = size.height
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

    adaptElement(size: ISize) {
        const {fill, gravity} = this.layout
        setupAdaptiveContainerLayout(this, {size, fill, gravity})
    }

}
