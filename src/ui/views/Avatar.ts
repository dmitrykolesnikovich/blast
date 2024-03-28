import Image from "./Image"
import {
    avatarBorderPng,
    avatarBorderShadowPng,
    avatarBoyPng,
    avatarGirlPng,
    avatarIndicatorPng,
    avatarIndicatorShinePng
} from "../../../res"
import {Container, IPointData, Point} from "pixi.js"
import Scroll from "./Scroll"
import LevelButton from "./LevelButton"
import {IPoint} from "@pixi/math/lib/IPoint"
import {animatePointer} from "../../features/animations"

export type Gender = 'boy' | 'girl'

type AvatarLayout = {
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

    constructor(layout: AvatarLayout) {
        super()
        const {position, gender, indicator = false} = layout
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
        this.scale.set(0.6)
    }

    set level(level: number) {
        const scroll: Scroll = this.parent?.parent?.parent as Scroll
        const buttonIndex = level - 1
        const buttons: LevelButton[] = scroll.buttons
        const button: LevelButton = buttons[buttonIndex]
        const buttonPosition: IPoint = button.position
        this.position.x = buttonPosition.x
        this.position.y = buttonPosition.y - this.height / 2 - 8
        for (let button of buttons) button.active = false
        button.active = true
        animatePointer(this)
    }

}
