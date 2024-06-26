import * as resources from "../res"
import {bootstrap, context} from "../src/engine"
import Navigation from "../src/features/navigation"

bootstrap(navigateWelcomeScreen)

async function navigateWelcomeScreen() {
    await context.loader.load(resources)
    new Navigation().navigateWelcomeScreen()
}
