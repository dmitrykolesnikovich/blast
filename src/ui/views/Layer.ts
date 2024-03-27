import {Container, IPointData, ISize} from "pixi.js"
import {context, View} from "../../engine"

type LayerOptions = {
    position?: IPointData
    size: ISize
}

// IMPORTANT used for tests only
export default function Layer(options: LayerOptions): Container {
    const {position = {x: 0, y: 0}, size} = options
    const view: View = new View(size)
    const layer: Container = new Container()
    layer.position = position
    view.append(layer)
    context.layout.append(view)
    return layer
}
