import * as resources from "../res"
import {bootstrap, context} from "../src/engine"
import settings from "../src/features/settings"
import Navigation from "../src/features/navigation"
import {setupAudio} from "../src/features/sounds"

bootstrap(navigateWelcomeScreen)

async function navigateWelcomeScreen() {
    await context.loader.load(resources, setupAudio)
    settings.gender = 'girl'
    settings.lives = 5
    settings.coins = 88
    const navigation: Navigation = new Navigation()
    navigation.navigateWelcomeScreen()
}
