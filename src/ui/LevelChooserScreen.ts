import {Sprite} from "pixi.js"
import {View} from "../engine"
import Image from "./views/Image"
import {
    avatarBoyPng,
    avatarGirlPng,
    avatarIndicatorPng,
    avatarIndicatorShinePng,
    background1Jpg,
    background2Jpg,
    background3Jpg,
    background4Jpg,
    background5Jpg,
    buttonCircleBluePng,
    buttonCircleGreenPng,
    buttonCircleGreyPng,
    buttonLevelDisabledPng,
    buttonLevelPng,
    buttonLevelShadowPng,
    buttonLevelShinePng,
    cloud1Png,
    cloud2Png,
    cloud3Png,
    cloudLevelPng,
    coins1Png,
    iconArrowBackPng,
    iconMorePng,
    life1Png,
    panelTitlePng,
    starSmallGreyPng,
    starSmallYellowPng
} from "../../res"
import Scroll from "./views/Scroll";
import Avatar from "./views/Avatar";
import settings from "../features/settings";
import LevelButton from "./views/LevelButton";

type Layout = {
    background: Scroll
    // panelTitle: Sprite
    // life1: Sprite
    // coins1: Sprite
    // buttonCircleGreen: Sprite
    // buttonCircleGrey: Sprite
    // iconMore: Sprite
    // starSmallYellow: Sprite
    // starSmallGrey: Sprite
    // avatar: Avatar
    // cloud1: Sprite
    // cloud2: Sprite
    // cloud3: Sprite
    // buttonCircleBlue: Sprite
    // iconArrowBack: Sprite
}

export default class LevelChooserScreen extends View<Layout> {
    constructor() {
        super({width: 450, height: 800})
        this.layout = {
            background: new Scroll({
                position: {x: 0, y: 0},
                size: {width: 450, height: 800},
                range: {min: -3200, max: 0},
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
                        position: {x: 0, y: 0},
                        size: {width: 450, height: 250},
                        foreground: cloudLevelPng
                    }),


                    // buttons
                    new LevelButton({
                        position: {x: 130, y: 3950},
                    }),
                    new LevelButton({
                        position: {x: 105, y: 3890},
                    }),
                    new LevelButton({
                        position: {x: 112, y: 3828},
                    }),
                    new LevelButton({
                        position: {x: 172, y: 3784},
                    }),
                    new LevelButton({
                        position: {x: 255, y: 3730},
                    }),
                    new LevelButton({
                        position: {x: 224, y: 3676},
                    }),
                    new LevelButton({
                        position: {x: 176, y: 3647},
                    }),
                    new LevelButton({
                        position: {x: 140, y: 3609},
                    }),
                    new LevelButton({
                        position: {x: 110, y: 3561},
                    }),
                    new LevelButton({
                        position: {x: 143, y: 3506},
                    }),
                    new LevelButton({
                        position: {x: 195, y: 3472},
                    }),
                    new LevelButton({
                        position: {x: 240, y: 3440},
                    }),
                    new LevelButton({
                        position: {x: 286, y: 3400},
                    }),
                    new LevelButton({
                        position: {x: 302, y: 3344},
                    }),
                    new LevelButton({
                        position: {x: 290, y: 3290},
                    }),
                    new LevelButton({
                        position: {x: 269, y: 3247},
                    }),
                ]
            }),
            // panelTitle: new Image({
            //     position: {x: 0, y: 0},
            //     size: {width: 100, height: 100},
            //     foreground: panelTitlePng
            // }),
            // life1: new Image({
            //     position: {x: 0, y: 0},
            //     size: {width: 100, height: 100},
            //     foreground: life1Png
            // }),
            // coins1: new Image({
            //     position: {x: 0, y: 0},
            //     size: {width: 100, height: 100},
            //     foreground: coins1Png
            // }),
            // buttonCircleGreen: new Image({
            //     position: {x: 0, y: 0},
            //     size: {width: 100, height: 100},
            //     foreground: buttonCircleGreenPng
            // }),
            // buttonCircleGrey: new Image({
            //     position: {x: 0, y: 0},
            //     size: {width: 100, height: 100},
            //     foreground: buttonCircleGreyPng
            // }),
            // iconMore: new Image({
            //     position: {x: 0, y: 0},
            //     size: {width: 100, height: 100},
            //     foreground: iconMorePng
            // }),
            // starSmallYellow: new Image({
            //     position: {x: 0, y: 0},
            //     size: {width: 100, height: 100},
            //     foreground: starSmallYellowPng
            // }),
            // starSmallGrey: new Image({
            //     position: {x: 0, y: 0},
            //     size: {width: 100, height: 100},
            //     foreground: starSmallGreyPng
            // }),
            // avatar: new Avatar({
            //     position: {x: 225, y: 400},
            //     gender: settings.gender,
            //     indicator: true
            // }),
            // cloud1: new Image({
            //     position: {x: 0, y: 0},
            //     size: {width: 100, height: 100},
            //     foreground: cloud1Png
            // }),
            // cloud2: new Image({
            //     position: {x: 0, y: 0},
            //     size: {width: 100, height: 100},
            //     foreground: cloud2Png
            // }),
            // cloud3: new Image({
            //     position: {x: 0, y: 0},
            //     size: {width: 100, height: 100},
            //     foreground: cloud3Png
            // }),
            // buttonCircleBlue: new Image({
            //     position: {x: 0, y: 0},
            //     size: {width: 100, height: 100},
            //     foreground: buttonCircleBluePng
            // }),
            // iconArrowBack: new Image({
            //     position: {x: 0, y: 0},
            //     size: {width: 100, height: 100},
            //     foreground: iconArrowBackPng
            // }),
        }

        const {background} = this.layout
        background.scrollTo(-400)
    }
}