import {Container, IPointData} from "pixi.js"

type PanelLayout = {
    position: IPointData
    items?: Array<Container>
}

export default function panel(layout: PanelLayout): Container {
    const {position, items} = layout
    const container: Container = new Container()
    container.position = position
    if (items) {
        container.addChild(...items)
    }
    return container
}