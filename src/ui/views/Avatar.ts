import Image from "./Image";
import {
    avatarBorderPng,
    avatarBorderShadowPng,
    avatarBoyPng,
    avatarGirlPng,
    avatarIndicatorPng,
    avatarIndicatorShinePng
} from "../../../res"
import {Container, IPointData} from "pixi.js";

export type Gender = 'boy' | 'girl'

type AvatarOptions = {
    position: IPointData
    gender: Gender
    indicator?: boolean
}

export default class Avatar extends Container {

    private avatarBorderShadow1: Image = this.addChild(new Image({
        position: {x: 0, y: 0},
        anchor: {x: 0.5, y: 0.5},
        size: {width: -1, height: -1}
    }))
    private image: Image = this.addChild(new Image({
        position: {x: 0, y: 0},
        anchor: {x: 0.5, y: 0.5},
        size: {width: 78, height: 78},
    }))
    private avatarBorder1: Image = this.addChild(new Image({
        position: {x: 0, y: 0},
        anchor: {x: 0.5, y: 0.5},
        size: {width: 100, height: 100}
    }))

    constructor(options: AvatarOptions) {
        super()
        const {position, gender, indicator = false} = options
        this.position = position
        this.image.foreground = gender === 'girl' ? avatarGirlPng : avatarBoyPng

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
            this.image.position.y = 0
        }
    }

}