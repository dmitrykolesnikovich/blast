import * as resources from "../res"
import {bootstrap, context} from "../src/engine"
import Navigation from "../src/features/navigation"

bootstrap(navigateCoinsShopDialog)

async function navigateCoinsShopDialog() {
    await context.loader.load(resources)
    const navigation: Navigation = new Navigation()
    navigation.navigateSettingsDialog()
}
