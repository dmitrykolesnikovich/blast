import {Container, IPointData} from "pixi.js"
import Image from "./Image"
import {
    buttonLevelDisabledPng,
    buttonLevelPng,
    buttonLevelShadowPng,
    buttonLevelShinePng
} from "../../../res"

import gsap, {Power3} from "gsap"
import {ClickListener, setupClickListener} from "../../features/click"
import Label from "./Label"

type LevelButtonLayout = {
    position: IPointData
    enabled?: boolean
    active?: boolean
    click?: ClickListener
    level: number
}

export default class LevelButton extends Container {

    private _isEnabled: boolean = false
    private _isActive: boolean = false
    readonly layout: LevelButtonLayout

    private readonly shine: Image = this.addChild(new Image({
        position: {x: 0, y: 0},
        anchor: {x: 0.5, y: 0.5},
        size: {width: 50, height: 43.87},
        foreground: buttonLevelShinePng,
        visible: false
    }))
    private readonly image: Image = this.addChild(new Image({
        position: {x: 0, y: 0},
        anchor: {x: 0.5, y: 0.5},
        size: {width: 48, height: 41},
    }))
    private readonly shineAnimation: GSAPAnimation = gsap.timeline({repeat: -1})
        .set(this.shine, {width: 24, height: 20.4, alpha: 1})
        .to(this.shine, {width: 120, height: 105.288, alpha: 0, duration: 2, ease: Power3.easeInOut})

    constructor(layout: LevelButtonLayout) {
        super()
        const {position, enabled = false, active = false, level} = this.layout = layout
        this.position = position
        this.enabled = enabled
        this.active = active
        setupClickListener(this)
        this.addChild(new Label({
            position: {x: 0, y: 0},
            anchor: {x: 0.4, y: 0.75},
            text: `${level}`,
            style: {
                fontSize: 14,
                fill: 'white',
                align: 'left',
                fontFamily: 'fredokaOne',
                fontWeight: '400'
            }
        }))
    }

    set enabled(enabled: boolean) {
        this._isEnabled = enabled
        this.image.foreground = enabled ? buttonLevelPng : buttonLevelDisabledPng
    }

    get enabled(): boolean {
        return this._isEnabled
    }

    set active(active: boolean) {
        this._isActive = active
        this.shine.visible = active

        if (active) {
            this.shineAnimation.resume(0)
        } else {
            this.shineAnimation.pause(0)
        }
    }

    get active(): boolean {
        return this._isActive
    }

}
