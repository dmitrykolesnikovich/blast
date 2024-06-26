import {Container, IPointData, ISize} from "pixi.js"
import {context, View} from "../../engine"

type LayerLayout = {
    position?: IPointData
    size: ISize
}

// IMPORTANT not used in production, used only to run examples
export default function Layer(layout: LayerLayout): Container {
    const {position = {x: 0, y: 0}, size} = layout
    const view: View = new View(size)
    const layer: Container = new Container()
    layer.position = position
    view.append(layer)
    context.layout.append(view)
    return layer
}
