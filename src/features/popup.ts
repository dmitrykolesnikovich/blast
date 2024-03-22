import {IPointData, ISize, NineSlicePlane, Texture} from "pixi.js"
import {panelAlert1Png} from "../../res"
import {Container} from "@pixi/display"
import {check, checkSize} from "../engine"

type PopupOptions = {
    position: IPointData,
    size: ISize,
}

/** minimum size: (400, 240) */
export default function popup1(options: PopupOptions): Container {
    checkSize(options.size, {min: {width: 400, height: 240}})

    const {position, size} = options
    const popup: NineSlicePlane = new NineSlicePlane(Texture.from(panelAlert1Png), 180, 100, 180, 100)
    popup.position = position
    popup.width = size.width
    popup.height = size.height
    popup.pivot.x = popup.width / 2
    popup.pivot.y = popup.height / 2
    return popup
}
