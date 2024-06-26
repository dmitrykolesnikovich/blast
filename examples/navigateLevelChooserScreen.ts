import * as resources from "../res"
import {bootstrap, context} from "../src/engine"
import Navigation from "../src/features/navigation"

bootstrap(navigateLevelChooserScreen)

async function navigateLevelChooserScreen() {
    await context.loader.load(resources)
    new Navigation().navigateLevelChooserScreen()
}
