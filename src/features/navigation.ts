import {context, EventBus, View} from "../engine"
import CoinsShopScreen from "../ui/CoinsShopScreen"
import GameScreen from "../ui/GameScreen"
import LevelChooserScreen from "../ui/LevelChooserScreen"
import GoalScreen from "../ui/GoalScreen"
import LivesShopScreen from "../ui/LivesShopScreen"
import LoseScreen from "../ui/LoseScreen"
import QuitScreen from "../ui/QuitScreen"
import SettingsScreen from "../ui/SettingsScreen"
import WelcomeScreen from "../ui/WelcomeScreen"
import WinScreen from "../ui/WinScreen"
import gsap, {Back, Power2} from "gsap"
import Curtain from "../ui/views/Curtain"

export default class Navigation {

    private coinsShopScreen: CoinsShopScreen = new CoinsShopScreen(this) // popup
    private gameScreen: GameScreen = new GameScreen(this)
    private goalScreen: GoalScreen = new GoalScreen(this) // popup
    private levelChooserScreen: LevelChooserScreen = new LevelChooserScreen(this)
    private livesShopScreen: LivesShopScreen = new LivesShopScreen(this) // popup
    private loseScreen: LoseScreen = new LoseScreen(this)
    private quitScreen: QuitScreen = new QuitScreen(this) // popup
    private settingsScreen: SettingsScreen = new SettingsScreen(this) // popup
    private welcomeScreen: WelcomeScreen = new WelcomeScreen(this)
    private winScreen: WinScreen = new WinScreen(this)
    private screen: View | undefined
    private dialog: View | undefined

    navigateCoinsShopScreen(): void {
        this.navigateDialog(this.coinsShopScreen)
    }

    navigateGameScreen(): void {
        this.navigateScreen(this.gameScreen)
    }

    navigateGoalScreen(): void {
        this.navigateDialog(this.goalScreen)
    }

    navigateLevelChooserScreen(): void {
        this.navigateScreen(this.levelChooserScreen)
    }

    navigateLivesShopScreen(): void {
        this.navigateDialog(this.livesShopScreen)
    }

    navigateLoseScreen(): void {
        this.navigateScreen(this.loseScreen)
    }

    navigateQuitScreen(): void {
        this.navigateDialog(this.quitScreen)
    }

    navigateSettingsScreen(): void {
        this.navigateDialog(this.settingsScreen)
    }

    navigateWelcomeScreen(): void {
        this.navigateScreen(this.welcomeScreen)
    }

    navigateWinScreen(): void {
        this.navigateScreen(this.winScreen)
    }

    private navigateDialog(dialog: View) {
        if (this.dialog === dialog) {
            context.layout.remove(dialog)
        } else if (this.dialog !== undefined) {
            this.hideDialog(this.dialog)
        }
        this.showDialog(dialog)
    }

    hideDialog(dialog: View) {
        gsap.timeline({
            onComplete: () => {
                context.layout.remove(dialog)
                dialog.container.scale.set(1, 1)
            }
        })
            .to(dialog.container.scale, {
                x: 0.2,
                y: 0.2,
                duration: 0.15,
                ease: Power2.easeIn
            })
    }

    private showDialog(dialog: View) {
        this.dialog = dialog
        context.layout.append(dialog)
        const x: number = dialog.container.width / 2
        const y: number = dialog.container.height / 2
        dialog.container.pivot.set(x, y)
        dialog.container.position.set(x, y)
        dialog.container.scale.set(0.2, 0.2)
        gsap.timeline()
            .to(dialog.container.scale, {
                x: 1,
                y: 1,
                duration: 0.22,
                ease: Back.easeOut
            })
    }

    navigateScreen(screen: View) {
        const curtain: Curtain = new Curtain()
        curtain.background.alpha = 0
        context.layout.append(curtain)
        gsap.timeline()
            .to(curtain.background, {
                alpha: 1,
                delay: 0.5,
                duration: 1,
                onComplete: () => {
                    if (this.screen !== undefined) {
                        context.layout.remove(this.screen)
                    }
                    this.screen = screen
                    context.layout.appendAt(screen, 0)
                }
            })
            .to(curtain.background, {
                alpha: 0,
                duration: 1,
                onComplete: () => {
                    context.layout.remove(curtain)
                }
            })
    }

}
