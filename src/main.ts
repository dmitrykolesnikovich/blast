import {bootstrap, context} from "./engine"
import * as resources from "../res"
import productionResources from "../res/production"
import manifest from "./manifest"
import settings from "./features/settings"
import Navigation from "./features/navigation"
import {playSound} from "./features/audio"
import {backgroundMp3} from "../res"

bootstrap(main)

async function main() {
    await context.loader.load(manifest.build == 'production' ? productionResources : resources)
    settings.gender = 'girl'
    settings.lives = 5
    settings.coins = 88
    const navigation: Navigation = new Navigation()
    navigation.navigateWelcomeScreen()
    playSound(backgroundMp3)
}
