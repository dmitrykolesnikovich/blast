import {IPointData, ISize, ITextStyle, Text} from "pixi.js"

export type LabelStyle = Partial<ITextStyle>

type LabelOptions = {
    text?: string,
    position: IPointData,
    anchor?: IPointData,
    style: LabelStyle,
    visible?: boolean
}

export default class Label extends Text {

    constructor(options: LabelOptions) {
        super()
        const {text, position, anchor, style, visible} = options
        this.position = position
        if (text !== undefined) {
            this.text = text
        }
        if (anchor !== undefined) {
            this.anchor.copyFrom(anchor)
        }
        this.style = style
        if (visible !== undefined) {
            this.visible = visible
        }
    }

}