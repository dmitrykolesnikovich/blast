import {IPointData, ISize, NineSlicePlane, Texture} from "pixi.js"
import {panelAlert1Png} from "../../res"
import {Container} from "@pixi/display"
import {check} from "../engine"

type PopupOptions = {
    position: IPointData,
    size: ISize,
}

export default function popup1(options: PopupOptions): Container {
    const {position, size} = options
    check(size.width >= 680 && size.height >= 400) // min
    const popup: NineSlicePlane = new NineSlicePlane(Texture.from(panelAlert1Png), 320, 180, 320, 180)
    popup.position = position
    popup.width = size.width
    popup.height = size.height
    popup.pivot.x = popup.width / 2
    popup.pivot.y = popup.height / 2
    return popup
}
