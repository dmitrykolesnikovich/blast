import {Sprite, Text} from "pixi.js"
import {View} from "../engine"
import {
    avatarBorderPng,
    avatarBorderShadowPng,
    avatarBoyPng,
    avatarGirlPng,
    buttonCheckboxPng,
    buttonClosePng,
    buttonIndicatorPng,
    buttonRadioPng,
    buttonRectangleGreenPng,
    buttonRectangleRedPng,
    dividerPng,
    iconHelpPng,
    iconInfoPng,
    iconMusicPng,
    iconResetPng,
    iconSoundPng,
} from "../../res"
import {popup1, redButton} from "../features/ninePatch"
import {Container} from "@pixi/display"
import RadioButtonGroup from "./views/RadioButtonGroup"
import Image from "./views/Image"
import Label from "./views/Label"
import Button from "./views/Button"

type Layout = {
    panelAlert1: Container
    buttonClose: Image
    avatarGirl: Image
    avatarBorder1: Image
    avatarBorderShadow1: Image
    avatarBoy: Image
    avatarBorder2: Image
    avatarBorderShadow2: Image
    radioButtons: Container
    divider1: Image
    divider2: Image
    divider3: Image
    iconSound: Image
    textSound: Label
    toggleSound: Button
    iconMusic: Image
    textMusic: Label
    toggleMusic: Button
    save: Button
    reset: Button
    iconReset: Image
    textReset: Label
    buttonHelp: Button
    buttonInfo: Button
}

export default class SettingsScreen extends View<Layout> {
    constructor() {
        super({width: 450, height: 800})
        this.layout = {
            panelAlert1: popup1({
                position: {x: 225, y: 400},
                size: {width: 450, height: 620},
            }),
            buttonClose: new Image({
                position: {x: 330, y: 110},
                size: {width: 60, height: 60},
                image: buttonClosePng
            }),
            avatarGirl: new Image({
                position: {x: 150, y: 240},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 78, height: 78},
                image: avatarGirlPng
            }),
            avatarBorderShadow1: new Image({
                position: {x: 150, y: 240},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 110, height: 110},
                image: avatarBorderShadowPng
            }),
            avatarBorder1: new Image({
                position: {x: 150, y: 240},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 100, height: 100},
                image: avatarBorderPng
            }),
            avatarBoy: new Image({
                position: {x: 300, y: 240},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 78, height: 78},
                image: avatarBoyPng
            }),
            avatarBorderShadow2: new Image({
                position: {x: 300, y: 240},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 110, height: 110},
                image: avatarBorderShadowPng
            }),
            avatarBorder2: new Image({
                position: {x: 300, y: 240},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 100, height: 100},
                image: avatarBorderPng
            }),
            radioButtons: new RadioButtonGroup({
                position: {x: 120, y: 315},
                size: {width: 40, height: 40},
                image: buttonRadioPng,
                indicator: buttonIndicatorPng,
                orientation: 'horizontal',
                items: ['Girl', 'Boy'],
                padding: 150,
                style: {
                    fontSize: 24,
                    fills: [0xFF0082, 0x0090FF],
                    align: 'left',
                    fontFamily: 'fredokaOne',
                    fontWeight: '400'
                },
            }),
            divider1: new Image({
                position: {x: 225, y: 340},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 300, height: 3.75},
                image: dividerPng
            }),
            iconSound: new Image({
                position: {x: 100, y: 370},
                anchor: {x: 0, y: 0.5},
                size: {width: 20, height: 20},
                image: iconSoundPng,
                tint: 0x00b9e7
            }),
            textSound: new Label({
                text: "Sound",
                position: {x: 130, y: 370},
                anchor: {x: 0, y: 0.5},
                style: {
                    fontSize: 20,
                    fill: 0x00b9e7,
                    align: 'left',
                    fontFamily: 'fredokaOne',
                    fontWeight: '400'
                },
            }),
            toggleSound: new Button({
                position: {x: 380, y: 370},
                anchor: {x: 1, y: 0.5},
                foreground: buttonIndicatorPng,
                size: {width: 30, height: 30},
                background: buttonCheckboxPng,
                backgroundSize: {width: 90, height: 36},
                toggle: true,
                enabled: false,
            }),
            iconMusic: new Image({
                position: {x: 100, y: 410},
                anchor: {x: 0, y: 0.5},
                size: {width: 20, height: 20},
                image: iconMusicPng,
                tint: 0x00b9e7
            }),
            textMusic: new Label({
                text: "Music",
                position: {x: 130, y: 410},
                anchor: {x: 0, y: 0.5},
                style: {
                    fontSize: 20,
                    fill: 0x00b9e7,
                    align: 'left',
                    fontFamily: 'fredokaOne',
                    fontWeight: '400'
                },
            }),
            toggleMusic: new Button({
                position: {x: 380, y: 410},
                anchor: {x: 1, y: 0.5},
                foreground: buttonIndicatorPng,
                size: {width: 30, height: 30},
                background: buttonCheckboxPng,
                backgroundSize: {width: 90, height: 36},
                toggle: true,
                enabled: false,
            }),
            save: new Button({
                position: {x: 225, y: 470},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 190.5, height: 68.625},
                foreground: buttonRectangleGreenPng,
                label: new Label({
                    position: {x: 0, y: 0},
                    anchor: {x: 0.5, y: 0.55},
                    text: "Save",
                    style: {
                        fontSize: 40,
                        fill: 'white',
                        align: 'left',
                        fontFamily: 'fredokaOne',
                        fontWeight: '400'
                    }
                }),
                click: (button) => {
                    console.log("save!!!")
                }
            }),
            divider2: new Image({
                position: {x: 225, y: 510},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 300, height: 3.75},
                image: dividerPng
            }),
            iconReset: new Image({
                position: {x: 100, y: 540},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 20, height: 20},
                image: iconResetPng,
                tint: 'red'
            }),
            textReset: new Label({
                position: {x: 120, y: 540},
                anchor: {x: 0, y: 0.5},
                text: 'Reset progress',
                style: {
                    fontSize: 16,
                    fill: 'red',
                    align: 'left',
                    fontFamily: 'fredokaOne',
                    fontWeight: '400'
                }
            }),
            reset: redButton({
                position: {x: 350, y: 540},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 24, height: 24},
                foreground: iconResetPng,
            }),
            divider3: new Image({
                position: {x: 225, y: 565},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 300, height: 3.75},
                image: dividerPng
            }),
            buttonHelp: new Button({
                position: {x: 190, y: 596},
                anchor: {x: 0.5, y: 0.5},
                foreground: iconHelpPng,
                size: {width: 24, height: 24},
                background: buttonRadioPng,
                backgroundSize: {width: 48, height: 48},
            }),
            buttonInfo: new Button({
                position: {x: 260, y: 596},
                anchor: {x: 0.5, y: 0.5},
                foreground: iconInfoPng,
                size: {width: 24, height: 24},
                background: buttonRadioPng,
                backgroundSize: {width: 48, height: 48},
            }),
        }
    }
}