import {Container, IPointData} from "pixi.js"

type PanelOptions = {
    position: IPointData
    items?: Array<Container>
    scale?: number
}

export default function panel(options: PanelOptions): Container {
    const {position, items, scale} = options
    const container: Container = new Container()
    container.position = position
    if (scale !== undefined) {
        container.scale.set(scale)
    }
    if (items) {
        container.addChild(...items)
    }
    return container
}