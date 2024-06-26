import * as resources from "../res"
import {bootstrap, context} from "../src/engine"
import Navigation from "../src/features/navigation"

bootstrap(navigateLivesShopDialog)

async function navigateLivesShopDialog() {
    await context.loader.load(resources)
    const navigation: Navigation = new Navigation()
    navigation.navigateLivesShopDialog()
}
