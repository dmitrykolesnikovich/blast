import * as resources from "../res"
import {bootstrap, context} from "../src/engine"
import settings from "../src/features/settings"
import Navigation from "../src/features/navigation"

bootstrap(navigateQuitDialog)

async function navigateQuitDialog() {
    await context.loader.load(resources)
    settings.gender = 'girl'
    settings.lives = 5
    settings.coins = 88
    const navigation: Navigation = new Navigation()
    navigation.navigateQuitDialog()
}
