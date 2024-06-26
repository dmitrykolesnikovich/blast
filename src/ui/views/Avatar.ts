import Image from "./Image"
import {Container, IPointData} from "pixi.js"
import {
    avatarBorderPng,
    avatarBorderShadowPng,
    avatarBoyPng,
    avatarGirlPng,
    avatarIndicatorPng,
    avatarIndicatorShinePng
} from "../../../res"

export type Gender = 'boy' | 'girl'

type AvatarLayout = {
    position: IPointData
    indicator?: boolean
    scale?: number
    gender?: Gender
}

export default class Avatar extends Container {

    readonly layout: AvatarLayout

    private avatarBorderShadow1: Image = this.addChild(new Image({
        position: {x: 0, y: 0},
        anchor: {x: 0.5, y: 0.5},
        size: {width: -1, height: -1}
    }))
    readonly image: Image = this.addChild(new Image({
        position: {x: 0, y: 0},
        anchor: {x: 0.5, y: 0.5},
        size: {width: 78, height: 78},
    }))
    private avatarBorder1: Image = this.addChild(new Image({
        position: {x: 0, y: 0},
        anchor: {x: 0.5, y: 0.5},
        size: {width: 100, height: 100}
    }))

    constructor(layout: AvatarLayout) {
        super()
        const {position, indicator = false, scale, gender} = this.layout = layout
        this.position = position
        this.eventMode = 'none'

        if (indicator) {
            this.avatarBorderShadow1.foreground = avatarIndicatorShinePng
            this.avatarBorderShadow1.position.y = 2
            this.avatarBorderShadow1.size = {width: 130, height: 146.4}
            this.avatarBorder1.foreground = avatarIndicatorPng
            this.avatarBorder1.size = {width: 102, height: 117}
            this.image.position.y = -8
        } else {
            this.avatarBorderShadow1.foreground = avatarBorderShadowPng
            this.avatarBorderShadow1.position.y = 0
            this.avatarBorderShadow1.size = {width: 110, height: 110}
            this.avatarBorder1.foreground = avatarBorderPng
            this.avatarBorder1.size = {width: 100, height: 100}
            this.image.position.y = -2
        }
        if (scale !== undefined) {
            this.scale.set(scale)
        }
        if (gender !== undefined) {
            this.gender = gender
        }
    }

    set gender(gender: Gender) {
        this.image.foreground = gender === 'girl' ? avatarGirlPng : avatarBoyPng
    }

}
