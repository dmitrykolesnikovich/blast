import {context, View} from "../engine"
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

export default class Navigation {

    private coinsShopScreen: CoinsShopScreen = new CoinsShopScreen()
    private gameScreen: GameScreen = new GameScreen()
    private goalScreen: GoalScreen = new GoalScreen()
    private levelChooserScreen: LevelChooserScreen = new LevelChooserScreen()
    private livesShopScreen: LivesShopScreen = new LivesShopScreen()
    private loseScreen: LoseScreen = new LoseScreen()
    private quitScreen: QuitScreen = new QuitScreen()
    private settingsScreen: SettingsScreen = new SettingsScreen()
    private welcomeScreen: WelcomeScreen = new WelcomeScreen()
    private winScreen: WinScreen = new WinScreen()

    navigateCoinsShopScreen(): void {
        navigate(this.coinsShopScreen)
    }

    navigateGameScreen(): void {
        navigate(this.gameScreen)
    }

    navigateGoalScreen(): void {
        navigate(this.goalScreen)
    }

    navigateLevelChooserScreen(): void {
        navigate(this.levelChooserScreen)
    }

    navigateLivesShopScreen(): void {
        navigate(this.livesShopScreen)
    }

    navigateLoseScreen(): void {
        navigate(this.loseScreen)
    }

    navigateQuitScreen(): void {
        navigate(this.quitScreen)
    }

    navigateSettingsScreen(): void {
        navigate(this.settingsScreen)
    }

    navigateWelcomeScreen(): void {
        navigate(this.welcomeScreen)
    }

    navigateWinScreen(): void {
        navigate(this.winScreen)
    }

}

function navigate(view: View) {
    context.layout.replaceAt(0, view)
}
