import {View} from "../engine"
import {
    backgroundGameJpg,
    buttonCircleGreenPng,
    buttonCircleGreyPng,
    buttonRectangleGreenSmallPng,
    iconMusicPng,
    iconSettingsPng,
    iconSoundPng,
    logoPng,
    particlesShineRadial1Png,
    particlesShineRadial2Png,
    playPng
} from "../../res"
import Button from "./views/Button"
import settings from "../features/settings"
import Image from "./views/Image"

type Layout = {
    backgroundGame: Image
    particlesShineRadial1: Image
    particlesShineRadial2: Image
    logo: Image
    play: Button
    iconSettings: Button
    iconSound: Button
    iconMusic: Button
}

export default class WelcomeScreen extends View<Layout> {
    constructor() {
        super({width: 450, height: 800})
        this.layout = {
            backgroundGame: new Image({
                position: {x: -27.5, y: 0},
                size: {width: 505, height: 800},
                image: backgroundGameJpg
            }),
            particlesShineRadial1: new Image({
                position: {x: 225, y: 220},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 900, height: 900},
                image: particlesShineRadial1Png
            }),
            particlesShineRadial2: new Image({
                position: {x: 225, y: 220},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 900, height: 900},
                image: particlesShineRadial2Png
            }),
            logo: new Image({
                position: {x: 225, y: 200},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 226.8, height: 235},
                image: logoPng
            }),
            play: new Button({
                position: {x: 225, y: 550},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 174.75, height: 78.375},
                image: playPng,
                background: buttonRectangleGreenSmallPng,
                backgroundSize: {width: 290, height: 128.9},
                click: () => {
                    console.log("play!!!")
                },
            }),
            iconSettings: new Button({
                position: {x: 125, y: 700},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 40, height: 40},
                image: iconSettingsPng,
                background: buttonCircleGreenPng,
                backgroundDisabled: buttonCircleGreyPng,
                backgroundSize: {width: 80, height: 80},
                click: () => {
                    console.log("settings")
                },
            }),
            iconSound: new Button({
                position: {x: 225, y: 700},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 40, height: 40},
                image: iconSoundPng,
                background: buttonCircleGreenPng,
                backgroundDisabled: buttonCircleGreyPng,
                backgroundSize: {width: 80, height: 80},
                checkbox: true,
                enabled: settings.soundEnabled,
                click: (button) => {
                    console.log(`sound: ${button.enabled}`)
                },
            }),
            iconMusic: new Button({
                position: {x: 325, y: 700},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 40, height: 40},
                image: iconMusicPng,
                background: buttonCircleGreenPng,
                backgroundDisabled: buttonCircleGreyPng,
                backgroundSize: {width: 80, height: 80},
                checkbox: true,
                enabled: settings.musicEnabled,
                click: (button) => {
                    console.log(`music: ${button.enabled}`)
                },
            })
        }
    }
}
