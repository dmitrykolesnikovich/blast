import {Adaptive, clearAnimations, Controller, setupContainerLayout, setupContainerAdaptiveLayout, View} from "../engine"
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
import {disableMusic, disableSound, enableMusic, enableSound} from "../features/sounds"
import {Container, ISize} from "pixi.js"

type Layout = {
    backgroundGame: Image
    particlesShineRadial1: Image
    particlesShineRadial2: Image
    logo: Image
    play: Button
    buttonSettings: Button
    checkboxSound: Button
    checkboxMusic: Button
}

export default class WelcomeScreen extends View<Layout> {

    constructor(navigation: Navigation) {
        super({width: 450, height: 800})
        this.layout = {
            backgroundGame: new Image({
                position: {x: -27.5, y: 0},
                size: {width: 505, height: 800},
                foreground: backgroundGameJpg,
                fill: 'horizontal',
                gravity: 'down'
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
                foreground: particlesShineRadial4Png,
                angle: 20
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
                click: () => {
                    navigation.navigateLevelChooserScreen()
                },
            }),
            buttonSettings: new Button({
                position: {x: 125, y: 700},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 40, height: 40},
                foreground: iconSettingsPng,
                background: buttonCircleGreenPng,
                backgroundDisabled: buttonCircleGreyPng,
                backgroundSize: {width: 80, height: 80},
                click: () => navigation.navigateSettingsDialog()
            }),
            checkboxSound: new Button({
                position: {x: 225, y: 700},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 40, height: 40},
                foreground: iconSoundPng,
                background: buttonCircleGreenPng,
                backgroundDisabled: buttonCircleGreyPng,
                backgroundSize: {width: 80, height: 80},
                checkbox: true,
                enabled: settings.soundEnabled,
                click: () => {
                    if (settings.soundEnabled) {
                        settings.soundEnabled = false
                        disableSound()
                    } else {
                        settings.soundEnabled = true
                        enableSound()
                    }
                },
            }),
            checkboxMusic: new Button({
                position: {x: 325, y: 700},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 40, height: 40},
                foreground: iconMusicPng,
                background: buttonCircleGreenPng,
                backgroundDisabled: buttonCircleGreyPng,
                backgroundSize: {width: 80, height: 80},
                checkbox: true,
                enabled: settings.musicEnabled,
                click: () => {
                    if (settings.musicEnabled) {
                        settings.musicEnabled = false
                        disableMusic()
                    } else {
                        settings.musicEnabled = true
                        enableMusic()
                    }
                },
            })
        }
    }

    focused() {
        const {play, particlesShineRadial1, particlesShineRadial2} = this.layout
        animateHeartBeat(play)
        animateRadialShine(particlesShineRadial1, particlesShineRadial2)
    }

    removed() {
        const {play, particlesShineRadial1, particlesShineRadial2} = this.layout
        clearAnimations(play, particlesShineRadial1, particlesShineRadial2)
    }

}

