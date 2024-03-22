import {IPointData, ISize, NineSlicePlane, Texture} from "pixi.js"
import {buttonRectangleRedPng, panelAlert1Png} from "../../res"
import {Container} from "@pixi/display"
import {checkSize} from "../engine"
import Button, {ButtonOptions} from "../ui/views/Button"

type PopupOptions = {
    position: IPointData,
    size: ISize,
}

/** popup minimum size: (400, 240) */
export function popup1(options: PopupOptions): Container {
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

/** popup minimum size: (60, 0) */
export function redButton(options: ButtonOptions): Button {
    const {size} = options
    const image: Container = new NineSlicePlane(Texture.from(buttonRectangleRedPng), 32, 0, 32, 0)
    image.width = size.width + 32
    image.height = size.height + 16
    image.pivot.x = image.width / 2
    image.pivot.y = image.height / 2

    const button: Button = new Button(options)
    if (image) {
        button.addChildAt(image, 0)
    }
    return button
}
