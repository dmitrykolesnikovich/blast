import {IPointData, ISize} from "pixi.js"
import {View} from "../../engine"

type LayerOptions = {
    position: IPointData
    size: ISize
}

export default function Layer(options: LayerOptions): View {
    const {position, size} = options
    const view: View = new View(size)
    view.container.position = position
    return view
}
