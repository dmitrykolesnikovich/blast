import {IPointData, ISize, NineSlicePlane, Texture} from "pixi.js"
import {buttonRectangleRedPng, panelAlert1Png, panelTitlePng} from "../../res"
import {Container} from "@pixi/display"
import {checkSize} from "../engine"
import Button, {ButtonOptions} from "../ui/views/Button"
import Label from "../ui/views/Label"

type PanelOptions = {
    position: IPointData,
    size: ISize,
    label?: Label
}

/** popup minimum size: (400, 240) */
export function popup1(options: PanelOptions): Container {
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

/** popup minimum size: (90, 50) */
export function panelTitle(options: PanelOptions): Container {
    checkSize(options.size, {min: {width: 100, height: 50}})

    const {position, size, label} = options
    const panel: NineSlicePlane = new NineSlicePlane(Texture.from(panelTitlePng), 25, 25, 25, 25)
    panel.position = position
    panel.width = size.width
    panel.height = size.height
    panel.pivot.x = panel.width / 2
    panel.pivot.y = panel.height / 2
    if (label) {
        panel.addChild(label)
    }
    return panel
}

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
