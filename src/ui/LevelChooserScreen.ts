import {Controller, isMobile, playSound, View} from "../engine"
import Image from "./views/Image"
import Scroll from "./views/Scroll"
import Avatar from "./views/Avatar"
import LevelButton from "./views/LevelButton"
import clouds from "../features/clouds"
import Button from "./views/Button"
import RefillPanel from "./views/RefillPanel"
import Navigation from "../features/navigation"
import {animateHeartBeat, animatePointer} from "../features/animations"
import {IPointData} from "pixi.js"
import {
    background1Jpg,
    background2Jpg,
    background3Jpg,
    background4Jpg,
    background5Jpg,
    buttonCircleBluePng,
    clickDisabledMp3,
    cloudLevelPng,
    iconArrowBackPng
} from "../../res"
import {GameController} from "../game/controller"

type Layout = {
    scroll: Scroll
    back: Button
    refillLives: RefillPanel
    refillCoins: RefillPanel
}

export default class LevelChooserScreen extends View<Layout> {

    constructor(navigation: Navigation) {
        super({width: 450, height: 800})
        this.layout = {
            scroll: new Scroll({
                position: {x: 0, y: 0},
                size: {width: 450, height: 800},
                range: {min: -3300, max: 0},
                fill: 'horizontal',
                gravity: 'down',
                avatar: new Avatar({
                    position: {x: 225, y: 400},
                    indicator: true,
                    scale: 0.6
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
                        level: index,
                    }))
                ]
            }),
            back: new Button({
                position: {x: 50, y: 700},
                anchor: {x: 0.5, y: 0.5},
                size: {width: 32, height: 32},
                foreground: iconArrowBackPng,
                background: buttonCircleBluePng,
                backgroundSize: {width: 64, height: 64},
                click: () => navigation.navigateWelcomeScreen()
            }),
            refillLives: new RefillPanel({
                position: {x: 110, y: 50},
                type: 'lives',
                click: () => navigation.navigateLivesShopDialog(),
            }),
            refillCoins: new RefillPanel({
                position: {x: 355, y: 50},
                type: 'coins',
                click: () => navigation.navigateCoinsShopDialog(),
            }),
        }

        const {scroll, refillLives} = this.layout
        scroll.scrollToEnd()
        clouds(scroll)
        if (!isMobile()) this.enableMask()
        animateHeartBeat(refillLives.icon)
    }

    focused({model, navigation}: GameController) {
        const {profile} = model
        const {refillLives, refillCoins, scroll} = this.layout
        const {avatar} = scroll.layout
        const buttons: LevelButton[] = scroll.items.content.children.filter(it => it instanceof LevelButton) as LevelButton[] // quickfix todo improve

        // refill
        refillLives.profile = profile
        refillCoins.profile = profile

        // avatar
        avatar.gender = profile.gender
        const button: LevelButton = buttons[profile.level]
        avatar.x = button.x
        avatar.y = button.y - avatar.image.height / 2
        for (let button of buttons) button.active = false
        button.active = true
        animatePointer(avatar)

        // buttons
        for (const button of buttons) {
            button.enabled = profile.level >= button.layout.level
            button.active = profile.level === button.layout.level
            button.layout.click = () => {
                if (profile.lives <= 0) {
                    navigation.navigateLivesShopDialog()
                } else {
                    navigation.navigateGoalDialog(button.layout.level)
                }
            }
        }
    }

}

export const LEVEL_BUTTON_PATH: IPointData[] = [
    {x: 130, y: 3950},
    {x: 105, y: 3890},
    {x: 112, y: 3828},
    {x: 172, y: 3784},
    {x: 255, y: 3730},
    {x: 224, y: 3676},
    {x: 176, y: 3647},
    {x: 140, y: 3609},
    {x: 110, y: 3561},
    {x: 143, y: 3506},
    {x: 195, y: 3472},
    {x: 240, y: 3440},
    {x: 286, y: 3400},
    {x: 302, y: 3344},
    {x: 290, y: 3290},
    {x: 269, y: 3247},
]
