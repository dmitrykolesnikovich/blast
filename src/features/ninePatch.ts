import {IPointData, ISize, NineSlicePlane, Texture} from "pixi.js"
import {Container} from "@pixi/display"
import {checkSize} from "../engine"
import Button, {ButtonOptions} from "../ui/views/Button"
import Label from "../ui/views/Label"
import Image from "../ui/views/Image"
import {
    buttonClosePng,
    buttonRectangleGreenPng,
    buttonRectangleRedPng, coins1Png,
    panelAlert1Png,
    panelCoinsPng,
    panelInfoPng,
    panelTitlePng
} from "../../res"

type PanelOptions = {
    position: IPointData,
    size: ISize,
    label?: Label
}

function setupPanelOptions(panel: Container, options: PanelOptions): Container {
    const {position, size, label} = options
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

/** popup minimum size: (400, 240) */
export function popup1(options: PanelOptions): Container {
    checkSize(options.size, {min: {width: 400, height: 240}})
    const popup: Container = setupPanelOptions(new NineSlicePlane(Texture.from(panelAlert1Png), 180, 100, 180, 100), options)

    const {size} = options
    const buttonClose: Image = popup.addChild(new Image({
        position: {x: size.width - 90, y: 50},
        anchor: {x: 0.5, y: 0.5},
        size: {width: 60, height: 60},
        foreground: buttonClosePng
    }))
    return popup
}

/** panel minimum size: (90, 50) */
export function panelTitle(options: PanelOptions): Container {
    checkSize(options.size, {min: {width: 100, height: 50}})
    return setupPanelOptions(new NineSlicePlane(Texture.from(panelTitlePng), 25, 25, 25, 25), options)
}

/** panel minimum size: (100, 100) */
export function panelInfo(options: PanelOptions): Container {
    checkSize(options.size, {min: {width: 100, height: 100}})
    return setupPanelOptions(new NineSlicePlane(Texture.from(panelInfoPng), 40, 60, 40, 60), options)
}

export function buttonColored(color: 'green' | 'red', options: ButtonOptions): Button {
    const {size} = options
    const imagePath: string = color === 'red' ? buttonRectangleRedPng : buttonRectangleGreenPng
    const image: Container = new NineSlicePlane(Texture.from(imagePath), 32, 0, 32, 0)
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

/** panel minimum size: (60, 40) */
export function panelCoins(options: PanelOptions): Container {
    checkSize(options.size, {min: {width: 60, height: 40}})
    const panel: Container = setupPanelOptions(new NineSlicePlane(Texture.from(panelCoinsPng), 30, 20, 30, 20), options)

    const {size} = options
    panel.addChild(new Image({
        position: {x: 0, y: size.height / 2},
        anchor: {x: 0.4, y: 0.5},
        size: {width: 0.97 * size.height * 1.15, height: size.height * 1.15},
        foreground: coins1Png,
    }))
    return panel
}
