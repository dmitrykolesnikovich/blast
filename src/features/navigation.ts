import {context, playSound, View} from "../engine"
import CoinsShopDialog from "../ui/CoinsShopDialog"
import LevelChooserScreen from "../ui/LevelChooserScreen"
import GoalDialog from "../ui/GoalDialog"
import LivesShopDialog from "../ui/LivesShopDialog"
import LoseDialog from "../ui/LoseDialog"
import QuitDialog from "../ui/QuitDialog"
import SettingsDialog from "../ui/SettingsDialog"
import WelcomeScreen from "../ui/WelcomeScreen"
import WinDialog from "../ui/WinDialog"
import gsap, {Back, Power2} from "gsap"
import AboutDialog from "../ui/AboutDialog"
import HelpDialog from "../ui/HelpDialog"
import {animateCurtain, hideCurtain, showCurtain} from "./curtain"
import {GameController} from "../game/controller"
import {setupAudio} from "./sounds"
import {buildLevel} from "../types/Level"
import {PRODUCTION_BALANCE} from "./balances"
import {dialogHideMp3, dialogShowMp3} from "../../res"

export default class Navigation {

    private readonly gameController: GameController = new GameController(this)
    private readonly aboutDialog: AboutDialog = new AboutDialog(this)
    private readonly coinsShopDialog: CoinsShopDialog = new CoinsShopDialog(this)
    private readonly goalDialog: GoalDialog = new GoalDialog(this)
    private readonly helpDialog: HelpDialog = new HelpDialog(this)
    private readonly levelChooserScreen: LevelChooserScreen = new LevelChooserScreen(this)
    private readonly livesShopDialog: LivesShopDialog = new LivesShopDialog(this)
    private readonly loseDialog: LoseDialog = new LoseDialog(this)
    private readonly quitDialog: QuitDialog = new QuitDialog(this)
    private readonly settingsDialog: SettingsDialog = new SettingsDialog(this)
    private readonly welcomeScreen: WelcomeScreen = new WelcomeScreen(this)
    private readonly winDialog: WinDialog = new WinDialog(this)
    private screen: View | undefined
    private dialog: View | undefined
    private isFirstScreen: boolean = true
    private selectedLevel: number

    constructor() {
        this.selectLevel(this.gameController.model.profile.level)
    }

    // quickfix todo improve
    update() {
        this.coinsShopDialog.focused(this.gameController)
        this.goalDialog.focused(this.gameController)
        this.levelChooserScreen.focused(this.gameController)
        this.livesShopDialog.focused(this.gameController)
        this.settingsDialog.focused(this.gameController)
        this.welcomeScreen.focused(this.gameController)
    }

    selectLevel(level: number) {
        level = Math.min(15, level)
        this.selectedLevel = level
        const {model} = this.gameController
        model.profile.level = level
        model.level = buildLevel(level, PRODUCTION_BALANCE)
    }

    /*core*/

    navigateGameScreen() {
        this.gameController.emit('startGame')
        this.navigateScreen(this.gameController.view)
    }

    navigateWinDialog() {
        this.navigateDialog(this.winDialog)
    }

    navigateLoseDialog() {
        this.navigateDialog(this.loseDialog)
    }

    /*meta*/

    navigateAboutDialog() {
        this.navigateDialog(this.aboutDialog)
    }

    navigateCoinsShopDialog() {
        this.navigateDialog(this.coinsShopDialog)
    }

    navigateGoalDialog(level: number) {
        this.selectLevel(level)
        this.navigateDialog(this.goalDialog)
    }

    navigateHelpDialog() {
        this.navigateDialog(this.helpDialog)
    }

    navigateLevelChooserScreen() {
        this.navigateScreen(this.levelChooserScreen)
    }

    navigateLivesShopDialog() {
        this.navigateDialog(this.livesShopDialog)
    }

    navigateQuitDialog() {
        this.navigateDialog(this.quitDialog)
    }

    navigateSettingsDialog() {
        this.navigateDialog(this.settingsDialog)
    }

    navigateWelcomeScreen() {
        this.navigateScreen(this.welcomeScreen)
    }

    /*internals*/

    private navigateScreen(screen: View) {
        screen.focused(this.gameController)
        if (this.isFirstScreen) {
            setupAudio(this.gameController.model.profile) // IMPORTANT
            this.screen = screen
            context.layout.appendAt(screen, 0)
            this.isFirstScreen = false
        } else {
            animateCurtain(() => {
                if (this.screen !== undefined) {
                    context.layout.remove(this.screen)
                }
                if (this.dialog !== undefined) {
                    context.layout.remove(this.dialog)
                    this.dialog = undefined
                }
                this.screen = screen
                context.layout.appendAt(screen, 0)
            })
        }
    }

    private navigateDialog(dialog: View) {
        dialog.focused(this.gameController)
        if (this.dialog === dialog) {
            context.layout.remove(dialog)
        } else if (this.dialog !== undefined) {
            this.hideDialog(this.dialog)
        }
        this.showDialog(dialog)
    }

    hideDialog(dialog: View) {
        playSound(dialogHideMp3)
        hideCurtain()
        gsap.timeline({
            onComplete: () => {
                context.layout.remove(dialog)
                dialog.content.scale.set(1, 1)
            }
        })
            .to(dialog.content.scale, {
                x: 0.1,
                y: 0.1,
                duration: 0.1,
                ease: Power2.easeIn
            })
        this.screen?.focused(this.gameController) // quickfix todo improve
    }

    private showDialog(dialog: View) {
        playSound(dialogShowMp3)
        showCurtain()
        this.dialog = dialog
        context.layout.append(dialog)
        const x: number = dialog.size.width / 2
        const y: number = dialog.size.height / 2
        dialog.content.pivot.set(x, y)
        dialog.content.position.set(x, y)
        dialog.content.scale.set(0.2, 0.2)
        gsap.timeline()
            .to(dialog.content.scale, {x: 1, y: 1, duration: 0.22, ease: Back.easeOut})
    }

}
