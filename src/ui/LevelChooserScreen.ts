import {View} from "../engine"
import Image from "./views/Image"
import {
    background1Jpg,
    background2Jpg,
    background3Jpg,
    background4Jpg,
    background5Jpg,
    buttonCircleBluePng,
    cloudLevelPng,
    iconArrowBackPng
} from "../../res"
import Scroll from "./views/Scroll"
import Avatar from "./views/Avatar"
import settings from "../features/settings"
import LevelButton from "./views/LevelButton"
import clouds from "../features/clouds"
import Button from "./views/Button"
import RefillPanel from "./views/RefillPanel"

type Layout = {
    background: Scroll
    back: Button
    refillLives: RefillPanel
    refillCoins: RefillPanel
}

export default class LevelChooserScreen extends View<Layout> {
    constructor() {
        super({width: 450, height: 800})
        this.layout = {
            background: new Scroll({
                position: {x: 0, y: 0},
                size: {width: 450, height: 800},
                range: {min: -3200, max: 0},
                avatar: new Avatar({
                    position: {x: 225, y: 400},
                    gender: settings.gender,
                    indicator: true
                }),
                items: [
                    new Image({
                        position: {x: 0, y: 100},
                        size: {width: 450, height: 781.5},
                        foreground: background5Jpg
                    }),
                    new Image({
                        position: {x: 0, y: 881.5},
                        size: {width: 450, height: 781.5},
                        foreground: background4Jpg
                    }),
                    new Image({
                        position: {x: 0, y: 1663},
                        size: {width: 450, height: 781.5},
                        foreground: background3Jpg
                    }),
                    new Image({
                        position: {x: 0, y: 2444.5},
                        size: {width: 450, height: 781.5},
                        foreground: background2Jpg
                    }),
                    new Image({
                        position: {x: 0, y: 3226},
                        size: {width: 450, height: 781.5},
                        foreground: background1Jpg
                    }),
                    new Image({
                        position: {x: 0, y: 4007.5},
                        size: {width: 450, height: 781.5},
                        foreground: background5Jpg
                    }),
                    new Image({
                        position: {x: 0, y: 80},
                        size: {width: 450, height: 250},
                        foreground: cloudLevelPng
                    }),

                    // buttons
                    new LevelButton({
                        position: {x: 130, y: 3950},
                        level: 1,
                        enabled: true,
                        click: () => background.options.avatar.level = 1
                    }),
                    new LevelButton({
                        position: {x: 105, y: 3890},
                        level: 2,
                        enabled: true,
                        click: () => background.options.avatar.level = 2
                    }),
                    new LevelButton({
                        position: {x: 112, y: 3828},
                        level: 3,
                        enabled: true,
                        click: () => background.options.avatar.level = 3
                    }),
                    new LevelButton({
                        position: {x: 172, y: 3784},
                        level: 4,
                        enabled: true,
                        click: () => background.options.avatar.level = 4
                    }),
                    new LevelButton({
                        position: {x: 255, y: 3730},
                        level: 5,
                        enabled: true,
                        click: () => background.options.avatar.level = 5
                    }),
                    new LevelButton({
                        position: {x: 224, y: 3676},
                        level: 6,
                        enabled: true,
                        click: () => background.options.avatar.level = 6
                    }),
                    new LevelButton({
                        position: {x: 176, y: 3647},
                        level: 7,
                        enabled: true,
                        click: () => background.options.avatar.level = 7
                    }),
                    new LevelButton({
                        position: {x: 140, y: 3609},
                        level: 8,
                        enabled: true,
                        click: () => background.options.avatar.level = 8
                    }),
                    new LevelButton({
                        position: {x: 110, y: 3561},
                        level: 9,
                        enabled: true,
                        click: () => background.options.avatar.level = 9
                    }),
                    new LevelButton({
                        position: {x: 143, y: 3506},
                        level: 10,
                        enabled: true,
                        click: () => background.options.avatar.level = 10
                    }),
                    new LevelButton({
                        position: {x: 195, y: 3472},
                        level: 11,
                        enabled: true,
                        click: () => background.options.avatar.level = 11
                    }),
                    new LevelButton({
                        position: {x: 240, y: 3440},
                        level: 12,
                    }),
                    new LevelButton({
                        position: {x: 286, y: 3400},
                        level: 13,
                    }),
                    new LevelButton({
                        position: {x: 302, y: 3344},
                        level: 14,
                    }),
                    new LevelButton({
                        position: {x: 290, y: 3290},
                        level: 15,
                    }),
                    new LevelButton({
                        position: {x: 269, y: 3247},
                        level: 16,
                    }),
                ]
            }),
            back: new Button({
                position: {x: 50, y: 700},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 32, height: 32},
                foreground: iconArrowBackPng,
                background: buttonCircleBluePng,
                backgroundSize: {width: 64, height: 64}
            }),
            refillLives: new RefillPanel({
                position: {x: 110, y: 50},
                type: 'lives'
            }),
            refillCoins: new RefillPanel({
                position: {x: 355, y: 50},
                type: 'coins'
            }),
        }

        const {background, refillLives, refillCoins} = this.layout
        background.scrollToEnd()
        clouds(background)
        refillLives.update()
        refillCoins.update()
    }
}