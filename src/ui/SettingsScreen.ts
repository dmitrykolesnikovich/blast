import {Sprite} from "pixi.js"
import {createSprite, View} from "../engine"
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
    dividerPng, iconHelpPng, iconInfoPng,
    iconMusicPng, iconResetPng,
    iconSoundPng,
    panelAlert1Png
} from "../../res"
import popup1 from "../features/popup";
import {Container} from "@pixi/display";

type Layout = {
    panelAlert1: Container
    buttonClose: Sprite
    avatarBorder: Sprite
    avatarBorderShadow: Sprite
    avatarBoy: Sprite
    avatarGirl: Sprite
    buttonRadio: Sprite
    buttonIndicator: Sprite
    divider: Sprite
    iconSound: Sprite
    iconMusic: Sprite
    buttonCheckbox: Sprite
    buttonRectangleGreen: Sprite
    buttonRectangleRed: Sprite
    iconReset: Sprite
    iconHelp: Sprite
    iconInfo: Sprite
}

export default class SettingsScreen extends View<Layout> {
    constructor() {
        super({width: 450, height: 800})
        this.layout = {
            panelAlert1: popup1({
                position: {x: 225, y: 400},
                size: {width: 700, height: 500},
            }),
            buttonClose: createSprite({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: buttonClosePng
            }),
            avatarBorder: createSprite({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: avatarBorderPng
            }),
            avatarBorderShadow: createSprite({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: avatarBorderShadowPng
            }),
            avatarBoy: createSprite({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: avatarBoyPng
            }),
            avatarGirl: createSprite({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: avatarGirlPng
            }),
            buttonRadio: createSprite({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: buttonRadioPng
            }),
            buttonIndicator: createSprite({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: buttonIndicatorPng
            }),
            divider: createSprite({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: dividerPng
            }),
            iconSound: createSprite({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: iconSoundPng
            }),
            iconMusic: createSprite({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: iconMusicPng
            }),
            buttonCheckbox: createSprite({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: buttonCheckboxPng
            }),
            buttonRectangleGreen: createSprite({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: buttonRectangleGreenPng
            }),
            buttonRectangleRed: createSprite({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: buttonRectangleRedPng
            }),
            iconReset: createSprite({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: iconResetPng
            }),
            iconHelp: createSprite({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: iconHelpPng
            }),
            iconInfo: createSprite({
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                image: iconInfoPng
            }),
        }
    }
}