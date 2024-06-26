import * as resources from "../res"
import {bootstrap, context} from "../src/engine"
import Navigation from "../src/features/navigation"

bootstrap(navigateGameScreen)

async function navigateGameScreen() {
    await context.loader.load(resources)
    new Navigation().navigateGameScreen()
}
