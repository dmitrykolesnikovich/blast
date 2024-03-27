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
import Navigation from "../features/navigation"
import {LEVEL_BUTTON_PATH} from "../features/levels"

type Layout = {
    background: Scroll
    back: Button
    refillLives: RefillPanel
    refillCoins: RefillPanel
}

export default class LevelChooserScreen extends View<Layout> {

    constructor(navigation: Navigation) {
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
                    ...LEVEL_BUTTON_PATH.map((position, index) => new LevelButton({
                        position: position,
                        level: index + 1,
                        enabled: settings.level > index,
                        active: settings.level === index + 1,
                    }))
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

        const {background, refillLives, refillCoins, } = this.layout
        background.scrollToEnd()
        clouds(background)
        refillLives.update()
        refillCoins.update()
        background.options.avatar.level = settings.level
    }
}