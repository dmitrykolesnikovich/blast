import {Container, IPointData, ISize, Sprite, Text} from "pixi.js"
import {enumerate, Orientation} from "../../engine"
import {buttonRadioPng} from "../../../res"
import {TextStyle, TextStyleFill} from "@pixi/text/lib/TextStyle"
import Image from "./Image"

class RadioButton extends Container {
    background: Sprite
    foreground: Sprite
    text: Text
}

type RadioButtonGroupOptions = {
    position: IPointData
    size: ISize
    image: string,
    indicator: string,
    orientation: Orientation
    items: string[],
    padding: number,
    style: Partial<TextStyle> & { fills: Array<TextStyleFill> }
}

export default class RadioButtonGroup extends Container {

    private selectedIndex: number
    private buttons: Array<RadioButton> = []

    constructor(options: RadioButtonGroupOptions) {
        super()
        const {position, size, image, indicator, orientation, items, padding, style} = options
        this.position = position
        for (let [index, item] of enumerate(items)) {
            const button: RadioButton = this.addChild(new RadioButton())

            button.background = button.addChild(new Image({
                size: size,
                foreground: buttonRadioPng,
                anchor: {x: 0.5, y: 0.5}
            }))
            button.foreground = button.addChild(new Image({
                size: {width: size.width * 0.5, height: size.height * 0.5},
                foreground: indicator,
                anchor: {x: 0.5, y: 0.5},
                visible: false
            }))
            button.text = button.addChild(new Text(item, style))

            // orientation
            switch (orientation) {
                case "horizontal": {
                    button.position.x = index * padding
                    button.text.position.x = size.width * 0.6
                    break
                }
                case "vertical": {
                    button.position.y = index * padding
                    button.text.position.y = size.height * 0.6
                    break
                }
            }

            button.text.anchor.set(0, 0.5)
            if (style.fills) {
                button.text.style.fill = style.fills[index]
            }

            button.eventMode = 'dynamic'
            button.on('pointerdown', () => this.select(index))
            this.buttons.push(button)
        }

        this.select(0)
    }

    select(selectedIndex: number) {
        this.selectedIndex = selectedIndex
        for (let button of this.buttons) button.foreground.visible = false
        this.buttons[selectedIndex].foreground.visible = true
    }

}
