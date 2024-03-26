import {bootstrap, context} from "./engine"
import * as resources from "../res"
import productionResources from "../res/production"
import manifest from "./manifest"
import settings from "./features/settings"
import Navigation from "./features/navigation"

bootstrap(main)

async function main() {
    await context.loader.load(manifest.build == 'production' ? productionResources : resources)
    settings.gender = 'girl'
    settings.lives = 5
    settings.coins = 88

    let counter: number = 0
    const navigation: Navigation = new Navigation()
    document.onpointerdown = () => {
        // if (counter === 0) navigation.navigateCoinsShopScreen()
        if (counter === 1) navigation.navigateGameScreen()
        // if (counter === 2) navigation.navigateGoalScreen()
        if (counter === 3) navigation.navigateLevelChooserScreen()
        // if (counter === 4) navigation.navigateLivesShopScreen()
        // if (counter === 5) navigation.navigateLoseScreen()
        // if (counter === 6) navigation.navigateQuitScreen()
        // if (counter === 7) navigation.navigateSettingsScreen()
        // if (counter === 8) navigation.navigateWelcomeScreen()
        // if (counter === 9) navigation.navigateWinScreen()
        counter++
        if (counter > 9) counter = 0
    }

}
