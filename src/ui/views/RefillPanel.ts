import {Container, IPointData} from "pixi.js"
import {panelTitle} from "../../features/ninePatch"
import Button from "./Button"
import Image from "./Image"
import Label from "./Label"
import settings from "../../features/settings"
import panel from "./Panel"
import {
    buttonCircleGreenPng,
    buttonCircleGreyPng,
    coins1Png,
    iconMorePng,
    life1Png
} from "../../../res"
import {cli} from "webpack"
import {ClickListener} from "../../features/click"

type RefillPanelType = 'coins' | 'lives'

type RefillPanelLayout = {
    position: IPointData
    type: RefillPanelType
    click: ClickListener
}

export default class RefillPanel extends Container {

    private readonly layout: RefillPanelLayout
    private readonly title: Label = new Label({
        position: {x: 0, y: 25},
        anchor: {x: 0.5, y: 0.5},
        style: {
            fontSize: 22,
            fill: 'white',
            align: 'left',
            fontFamily: 'fredokaOne',
            fontWeight: '400',
        }
    })
    private readonly background: Container = this.addChild(panelTitle({
        position: {x: 0, y: 0},
        size: {width: 170, height: 50},
        label: this.title
    }))
    readonly button: Button = this.addChild(new Button({
        position: {x: 61, y: 0},
        anchor: {x: 0.5, y: 0.5},
        size: {width: 24, height: 24},
        foreground: iconMorePng,
        background: buttonCircleGreenPng,
        backgroundDisabled: buttonCircleGreyPng,
        backgroundSize: {width: 40, height: 40},
    }))
    readonly icon: Container = this.addChild(panel({
        position: {x: -64, y: 0}
    }))

    constructor(layout: RefillPanelLayout) {
        super()
        const {position, type, click} = this.layout = layout
        this.position = position
        this.button.layout.click = click

        switch (type) {
            case 'lives': {
                this.title.x = 92 // quickfix todo improve
                this.icon.addChild(new Image({
                    position: {x: 0, y: 0},
                    anchor: {x: 0.5, y: 0.5},
                    size: {width: 100, height: 73.125},
                    foreground: life1Png,
                }))
                this.icon.addChild(new Label({
                    position: {x: 0, y: -1},
                    anchor: {x: 0.5, y: 0.5},
                    style: {
                        fontSize: 36,
                        fill: 'white',
                        align: 'left',
                        fontFamily: 'fredokaOne',
                        fontWeight: '400',
                        dropShadow: true,
                        dropShadowAngle: 0.5,
                        dropShadowDistance: 2
                    }
                }))
                break
            }
            case 'coins': {
                this.title.x = 88 // quickfix todo improve
                this.icon.addChild(new Image({
                    position: {x: 0, y: 0},
                    anchor: {x: 0.5, y: 0.5},
                    size: {width: 64, height: 65.8},
                    foreground: coins1Png,
                }))
            }
        }
    }

    update() {
        const {type} = this.layout
        switch (type) {
            case 'lives': {
                const label: Label = this.icon.getChildAt(1) as Label // quickfix todo improve
                label.text = settings.lives
                if (settings.lives >= 5) {
                    this.title.text = "FULL"
                } else {
                    this.title.text = ""
                }
                break
            }
            case 'coins': {
                this.title.text = settings.coins // quickfix todo improve
            }
        }
    }

}
