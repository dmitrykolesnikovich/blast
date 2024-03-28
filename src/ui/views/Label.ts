import {IPointData, ITextStyle, Text} from "pixi.js"

export type LabelStyle = Partial<ITextStyle>

type LabelLayout = {
    text?: string,
    position: IPointData,
    anchor?: IPointData,
    style: LabelStyle,
    visible?: boolean
}

export default class Label extends Text {

    constructor(layout: LabelLayout) {
        super()
        const {text, position, anchor, style, visible} = layout
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