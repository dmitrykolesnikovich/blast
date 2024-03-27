import {Controller, View} from "../engine"
import {
    backgroundGameJpg,
    buttonCircleGreenPng,
    buttonCircleGreyPng,
    buttonRectangleGreenSmallPng,
    iconMusicPng,
    iconSettingsPng,
    iconSoundPng,
    logoPng, particlesShinePng,
    particlesShineRadial1Png,
    particlesShineRadial2Png, particlesShineRadial3Png, particlesShineRadial4Png,
    playPng
} from "../../res"
import Button from "./views/Button"
import settings from "../features/settings"
import Image from "./views/Image"
import Navigation from "../features/navigation"
import {animateHeartBeat, animateRadialShine} from "../features/animations"

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

    constructor(navigation: Navigation) {
        super({width: 450, height: 800})
        this.layout = {
            backgroundGame: new Image({
                position: {x: -27.5, y: 0},
                size: {width: 505, height: 800},
                foreground: backgroundGameJpg
            }),
            particlesShineRadial1: new Image({
                position: {x: 225, y: 220},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 900, height: 900},
                foreground: particlesShineRadial3Png
            }),
            particlesShineRadial2: new Image({
                position: {x: 225, y: 220},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 900, height: 900},
                foreground: particlesShineRadial4Png
            }),
            logo: new Image({
                position: {x: 225, y: 200},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 226.8, height: 235},
                foreground: logoPng
            }),
            play: new Button({
                position: {x: 225, y: 550},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 174.75 * 0.77, height: 78.375 * 0.77},
                foreground: playPng,
                background: buttonRectangleGreenSmallPng,
                backgroundSize: {width: 290 * 0.77, height: 128.9 * 0.77},
                click: (button) => {
                    console.log(`play: ${button.width}`)
                },
            }),
            iconSettings: new Button({
                position: {x: 125, y: 700},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 40, height: 40},
                foreground: iconSettingsPng,
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
                foreground: iconSoundPng,
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
                foreground: iconMusicPng,
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

        const {play, particlesShineRadial1, particlesShineRadial2} = this.layout
        animateHeartBeat(play)
        animateRadialShine(particlesShineRadial1, particlesShineRadial2)
    }

}
