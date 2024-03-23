import {Container, IPointData} from "pixi.js"

type PanelOptions = {
    position: IPointData
    items?: Array<Container>
}

export default function panel(options: PanelOptions): Container {
    const {position, items} = options
    const container: Container = new Container()
    container.position = position
    if (items) {
        container.addChild(...items)
    }
    return container
}