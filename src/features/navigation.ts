import {context, playSound, View} from "../engine"
import CoinsShopDialog from "../ui/CoinsShopDialog"
import GameScreen from "../ui/GameScreen"
import LevelChooserScreen from "../ui/LevelChooserScreen"
import GoalDialog from "../ui/GoalDialog"
import LivesShopDialog from "../ui/LivesShopDialog"
import LoseScreen from "../ui/LoseScreen"
import QuitDialog from "../ui/QuitDialog"
import SettingsDialog from "../ui/SettingsDialog"
import WelcomeScreen from "../ui/WelcomeScreen"
import WinScreen from "../ui/WinScreen"
import gsap, {Back, Power2} from "gsap"
import Curtain from "../ui/views/Curtain"
import {backgroundMp3, dialogHideMp3, dialogShowMp3, loseMp3, whooshMp3, winMp3} from "../../res"

export default class Navigation {

    private coinsShopDialog: CoinsShopDialog = new CoinsShopDialog(this)
    private gameScreen: GameScreen = new GameScreen(this)
    private goalDialog: GoalDialog = new GoalDialog(this)
    private levelChooserScreen: LevelChooserScreen = new LevelChooserScreen(this)
    private livesShopDialog: LivesShopDialog = new LivesShopDialog(this)
    private loseScreen: LoseScreen = new LoseScreen(this)
    private quitDialog: QuitDialog = new QuitDialog(this)
    private settingsDialog: SettingsDialog = new SettingsDialog(this)
    private welcomeScreen: WelcomeScreen = new WelcomeScreen(this)
    private winScreen: WinScreen = new WinScreen(this)
    private screen: View | undefined
    private dialog: View | undefined

    navigateCoinsShopDialog(): void {
        this.navigateDialog(this.coinsShopDialog)
    }

    navigateGameScreen(): void {
        this.navigateScreen(this.gameScreen, () => playSound(backgroundMp3))
    }

    navigateGoalDialog(): void {
        this.navigateDialog(this.goalDialog)
    }

    navigateLevelChooserScreen(): void {
        this.navigateScreen(this.levelChooserScreen, () => playSound(backgroundMp3))
    }

    navigateLivesShopDialog(): void {
        this.navigateDialog(this.livesShopDialog)
    }

    navigateLoseScreen(): void {
        this.navigateScreen(this.loseScreen, () => playSound(loseMp3))
    }

    navigateQuitDialog(): void {
        this.navigateDialog(this.quitDialog)
    }

    navigateSettingsDialog(): void {
        this.navigateDialog(this.settingsDialog)
    }

    navigateWelcomeScreen(): void {
        this.navigateScreen(this.welcomeScreen, () => playSound(backgroundMp3))
    }

    navigateWinScreen(): void {
        this.navigateScreen(this.winScreen, () => playSound(winMp3))
    }

    /*internals*/

    private navigateScreen(screen: View, complete?: Function) {
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
                    if (complete) complete()
                }
            })
    }

    private navigateDialog(dialog: View) {
        playSound(whooshMp3)
        if (this.dialog === dialog) {
            context.layout.remove(dialog)
        } else if (this.dialog !== undefined) {
            this.hideDialog(this.dialog)
        }
        this.showDialog(dialog)
    }

    hideDialog(dialog: View) {
        playSound(dialogHideMp3)
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
            .to(dialog.container.scale, {x: 1, y: 1, duration: 0.22, ease: Back.easeOut, onComplete: () => playSound(dialogShowMp3)})
    }

}
