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
    dividerPng, fredokaOneTtf, iconHelpPng, iconInfoPng,
    iconMusicPng, iconResetPng,
    iconSoundPng,
    panelAlert1Png
} from "../../res"
import popup1 from "../features/popup";
import {Container} from "@pixi/display";
import RadioButtonGroup from "./views/RadioButtonGroup";
import Image from "./views/Image";
import Label from "./views/Label";

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
    divider: Image
    iconSound: Image
    textSound: Label
    iconMusic: Image
    textMusic: Label
    buttonCheckbox: Image
    buttonRectangleGreen: Image
    buttonRectangleRed: Image
    iconReset: Image
    iconHelp: Image
    iconInfo: Image
}

export default class SettingsScreen extends View<Layout> {
    constructor() {
        super({width: 450, height: 800})
        this.layout = {
            panelAlert1: popup1({
                position: {x: 225, y: 400},
                size: {width: 450, height: 600},
            }),
            buttonClose: new Image({
                position: {x: 330, y: 120},
                size: {width: 60, height: 60},
                image: buttonClosePng
            }),
            avatarGirl: new Image({
                position: {x: 150, y: 300},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 78, height: 78},
                image: avatarGirlPng
            }),
            avatarBorderShadow1: new Image({
                position: {x: 150, y: 300},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 110, height: 110},
                image: avatarBorderShadowPng
            }),
            avatarBorder1: new Image({
                position: {x: 150, y: 300},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 100, height: 100},
                image: avatarBorderPng
            }),
            avatarBoy: new Image({
                position: {x: 300, y: 300},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 78, height: 78},
                image: avatarBoyPng
            }),
            avatarBorderShadow2: new Image({
                position: {x: 300, y: 300},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 110, height: 110},
                image: avatarBorderShadowPng
            }),
            avatarBorder2: new Image({
                position: {x: 300, y: 300},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 100, height: 100},
                image: avatarBorderPng
            }),
            radioButtons: new RadioButtonGroup({
                position: {x: 120, y: 380},
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
            divider: new Image({
                position: {x: 225, y: 410},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 300, height: 3.75},
                image: dividerPng
            }),
            iconSound: new Image({
                position: {x: 100, y: 430},
                anchor: {x: 0, y: 0.5},
                size: {width: 20, height: 20},
                image: iconSoundPng,
                tint: 0x00b9e7
            }),
            textSound: new Label({
                text: "Sound",
                position: {x: 130, y: 430},
                anchor: {x: 0, y: 0.5},
                style: {
                    fontSize: 20,
                    fill: 0x00b9e7,
                    align: 'left',
                    fontFamily: 'fredokaOne',
                    fontWeight: '400'
                },
            }),
            iconMusic: new Image({
                position: {x: 100, y: 470},
                anchor: {x: 0, y: 0.5},
                size: {width: 20, height: 20},
                image: iconMusicPng,
                tint: 0x00b9e7
            }),
            textMusic: new Label({
                text: "Music",
                position: {x: 130, y: 470},
                anchor: {x: 0, y: 0.5},
                style: {
                    fontSize: 20,
                    fill: 0x00b9e7,
                    align: 'left',
                    fontFamily: 'fredokaOne',
                    fontWeight: '400'
                },
            }),
            buttonCheckbox: new Image({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: buttonCheckboxPng
            }),
            buttonRectangleGreen: new Image({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: buttonRectangleGreenPng
            }),
            buttonRectangleRed: new Image({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: buttonRectangleRedPng
            }),
            iconReset: new Image({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: iconResetPng
            }),
            iconHelp: new Image({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: iconHelpPng
            }),
            iconInfo: new Image({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: iconInfoPng
            }),
        }
    }
}