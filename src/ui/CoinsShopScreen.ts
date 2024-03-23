import {View} from "../engine"
import {panelCoins, popup1} from "../features/ninePatch"
import {Container} from "pixi.js"
import PurchasePanel from "./views/PurchasePanel"
import Label from "./views/Label"

type Layout = {
    panelAlert1: Container
    panelCoins: Container
    labelCoins: Label
    purchase2: PurchasePanel
    purchase3: PurchasePanel
    purchase4: PurchasePanel
    purchase5: PurchasePanel
    purchase6: PurchasePanel
}

export default class CoinsShopScreen extends View<Layout> {
    constructor() {
        super({width: 450, height: 800})
        this.layout = {
            panelAlert1: popup1({
                position: {x: 225, y: 400},
                size: {width: 450, height: 600},
            }),
            panelCoins: panelCoins({
                position: {x: 225, y: 220},
                size: {width: 120, height: 40},
            }),
            labelCoins: new Label({
                position: {x: 225, y: 220},
                anchor: {x: 0.5, y: 0.5},
                text: "789",
                style: {
                    fontSize: 22,
                    fill: 'white',
                    align: 'left',
                    fontFamily: 'fredokaOne',
                    fontWeight: '400',
                }
            }),
            purchase2: new PurchasePanel({
                position: {x: 225, y: 570},
                size: {width: 320, height: 65},
                index: 2,
            }),
            purchase3: new PurchasePanel({
                position: {x: 225, y: 500},
                size: {width: 320, height: 65},
                index: 3,
            }),
            purchase4: new PurchasePanel({
                position: {x: 225, y: 430},
                size: {width: 320, height: 65},
                index: 4,
            }),
            purchase5: new PurchasePanel({
                position: {x: 225, y: 360},
                size: {width: 320, height: 65},
                index: 5,
            }),
            purchase6: new PurchasePanel({
                position: {x: 225, y: 290},
                size: {width: 320, height: 65},
                index: 6,
            }),
        }
    }
}