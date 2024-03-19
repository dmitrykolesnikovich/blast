import {Container, DisplayObject} from "pixi.js"
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