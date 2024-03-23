import {ColorSource, Container, DisplayObject, IPointData, ISize, Point, Sprite, Texture, TilingSprite} from "pixi.js"
import {context} from "./Engine"
import {Particle} from "@pixi/particle-emitter"

declare module "pixi.js" {
    interface Container {
        root(): Container

        isAttached(): boolean
    }
}

if (!Container.prototype.root) {
    Container.prototype.root = function () {
        let current: Container = this
        while (true) {
            if (current.parent == null) return current
            current = current.parent
        }
    }
}

if (!Container.prototype.isAttached) {
    Container.prototype.isAttached = function () {
        return this.root() === context.app.stage
    }
}

export function containerOf<T extends DisplayObject>(...children: T[]): Container<T> {
    const container = new Container<T>()
    container.addChild(...children)
    return container
}

Particle.prototype.isInteractive = () => false

type TilingSpriteOptions = {
    position: IPointData,
    size: ISize,
    image: string,
    scale?: number,
    anchor?: IPointData,
    tint?: ColorSource
}

export function createTilingSprite(options: TilingSpriteOptions): TilingSprite {
    const {position, size, scale = 1, image, anchor} = options
    const sprite: TilingSprite = new TilingSprite(Texture.from(image), size.width, size.height)
    sprite.position = position
    sprite.tileScale.set(scale, scale)
    if (anchor) {
        sprite.anchor.copyFrom(anchor)
    }
    return sprite
}

export function flipSpriteHorizontally(sprite: Sprite) {
    sprite.anchor.x = 1
    sprite.scale.x *= -1
}