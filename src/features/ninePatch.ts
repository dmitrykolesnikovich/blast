import {IPointData, ISize, NineSlicePlane, Texture} from "pixi.js"
import {Container} from "@pixi/display"
import {checkSize} from "../engine"
import Button, {ButtonLayout} from "../ui/views/Button"
import Label from "../ui/views/Label"
import Image from "../ui/views/Image"
import {
    buttonClosePng, buttonRectangleGreenDarkPng,
    buttonRectangleGreenPng, buttonRectanglePinkPng,
    buttonRectangleRedPng, coins1Png,
    panelAlert1Png, panelAlert2Png,
    panelCoinsPng, panelGoalPng, panelHeadlinePng,
    panelInfoPng,
    panelTitlePng
} from "../../res"
import {ClickListener} from "./click"

export class Popup extends Container {

    readonly buttonClose: Button = new Button({
        position: {x: -64, y: 48},
        anchor: {x: 0.5, y: 0.5},
        size: {width: 48, height: 48},
        foreground: buttonClosePng
    })
    readonly title: Label = new Label({
        position: {x: 0, y: 0},
        anchor: {x: 0.5, y: 0.5},
        style: {
            fontSize: 32,
            fill: 0xFFEA00,
            align: 'left',
            fontFamily: 'fredokaOne',
            fontWeight: '400',
            dropShadow: true,
            dropShadowAngle: 0.5,
            dropShadowDistance: 2,
            dropShadowBlur: 2,
        },
    })

    constructor(background: Container) {
        super()
        this.addChild(background)
        background.addChild(this.buttonClose)
        background.addChild(this.title)
        this.buttonClose.x += background.width
        this.title.position.set(background.width / 2, 48)
    }

}

type PanelOptions = {
    position: IPointData,
    size: ISize,
    label?: Label
    close?: ClickListener
    title?: string
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

/** popup minimum size: (300, 240) */
export function popup(options: PanelOptions): Popup {
    checkSize(options.size, {min: {width: 300, height: 240}})
    const popup: Popup = new Popup(setupPanelOptions(new NineSlicePlane(Texture.from(panelAlert1Png), 130, 100, 130, 100), options))
    popup.buttonClose.layout.click = options.close
    popup.title.text = options.title ?? ""
    return popup
}

/** popup minimum size: (220, 250) */
export function panelAlert2(options: PanelOptions): Container {
    checkSize(options.size, {min: {width: 180, height: 180}})
    return setupPanelOptions(new NineSlicePlane(Texture.from(panelAlert2Png), 90, 90, 90, 90), options)
}

/** panel minimum size: (90, 50) */
export function panelTitle(options: PanelOptions): Container {
    checkSize(options.size, {min: {width: 100, height: 50}})
    return setupPanelOptions(new NineSlicePlane(Texture.from(panelTitlePng), 25, 25, 25, 25), options)
}

/** panel minimum size: (104, 48) */
export function panelHeadLine(options: PanelOptions): Container {
    checkSize(options.size, {min: {width: 104, height: 48}})
    return setupPanelOptions(new NineSlicePlane(Texture.from(panelHeadlinePng), 32, 24, 32, 24), options)
}

/** panel minimum size: (100, 100) */
export function panelInfo(options: PanelOptions): Container {
    checkSize(options.size, {min: {width: 100, height: 100}})
    return setupPanelOptions(new NineSlicePlane(Texture.from(panelInfoPng), 40, 60, 40, 60), options)
}

/** panel minimum size: (100, 100) */
export function panelGoal(options: PanelOptions): Container {
    checkSize(options.size, {min: {width: 100, height: 100}})
    return setupPanelOptions(new NineSlicePlane(Texture.from(panelGoalPng), 40, 60, 40, 60), options)
}

export function buttonColored(color: 'green' | 'greenDark' | 'pink' | 'red', options: ButtonLayout): Button {
    const {size} = options
    let imagePath: string
    switch (color) {
        case "green": {
            imagePath = buttonRectangleGreenPng
            break
        }
        case "greenDark": {
            imagePath = buttonRectangleGreenDarkPng
            break
        }
        case "pink": {
            imagePath = buttonRectanglePinkPng
            break
        }
        case "red": {
            imagePath = buttonRectangleRedPng
            break
        }
    }
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
