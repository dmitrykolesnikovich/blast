import {Controller, View} from "../engine"
import {panelCoins, Popup, popup} from "../features/ninePatch"
import {Container} from "pixi.js"
import PurchasePanel from "./views/PurchasePanel"
import Label from "./views/Label"
import Navigation from "../features/navigation"
import {GameController} from "../game/controller"
import Button from "./views/Button"

type Layout = {
    popup: Popup
    panelCoins: Container
    purchase2: PurchasePanel
    purchase3: PurchasePanel
    purchase4: PurchasePanel
    purchase5: PurchasePanel
    purchase6: PurchasePanel
}

export default class CoinsShopDialog extends View<Layout> {

    constructor(navigation: Navigation) {
        super({width: 450, height: 800})
        this.layout = {
            popup: popup({
                position: {x: 225, y: 400},
                size: {width: 440, height: 600},
                title: "Coins Shop",
                close: () => navigation.hideDialog(this),
            }),
            panelCoins: panelCoins({
                position: {x: 225, y: 220},
                size: {width: 120, height: 40},
                title: "",
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

    focused({model, navigation}: GameController) {
        const {profile} = model
        const {panelCoins, purchase2, purchase3, purchase4, purchase5, purchase6} = this.layout;
        const label = panelCoins.children[1] as Label
        const button2 = purchase2.children[3] as Button
        const button3 = purchase3.children[3] as Button
        const button4 = purchase4.children[3] as Button
        const button5 = purchase5.children[3] as Button
        const button6 = purchase6.children[3] as Button

        label.text = profile.coins

        function purchase(coins: number) {
            profile.coins += coins
            navigation.update()
        }

        button2.layout.click = () => purchase(purchase2.coins)
        button3.layout.click = () => purchase(purchase3.coins)
        button4.layout.click = () => purchase(purchase4.coins)
        button5.layout.click = () => purchase(purchase5.coins)
        button6.layout.click = () => purchase(purchase6.coins)
    }

}
