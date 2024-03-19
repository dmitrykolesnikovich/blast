import {ColorSource, IPointData, ISize, Sprite, Texture, TilingSprite} from "pixi.js"

type SpriteOptions = {
    position: IPointData,
    size: ISize,
    scale?: number,
    image: string,
    anchor?: IPointData,
    tint?: ColorSource
}

export function createSprite(options: SpriteOptions): Sprite {
    const {position, size, scale = 1, image, anchor, tint} = options
    const sprite: Sprite = new Sprite(Texture.from(image))
    sprite.position = position
    sprite.width = size.width
    sprite.height = size.height
    sprite.scale.set(scale, scale)
    if (anchor) {
        sprite.anchor.copyFrom(anchor)
    }
    if (tint) {
        sprite.tint = tint
    }
    return sprite
}


export function createTilingSprite(options: SpriteOptions): TilingSprite {
    const {position, size, scale = 1, image, anchor} = options
    const sprite: TilingSprite = new TilingSprite(Texture.from(image), size.width, size.height)
    sprite.position = position
    sprite.tileScale.set(scale, scale)
    if (anchor) {
        sprite.anchor.copyFrom(anchor)
    }
    return sprite
}
