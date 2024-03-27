import {bootstrap, context} from "./engine"
import * as resources from "../res"
import productionResources from "../res/production"
import manifest from "./manifest"
import settings from "./features/settings"
import Navigation from "./features/navigation"
import {setupAudio} from "./features/sounds"

bootstrap(main)

async function main() {
    context.loader.completeListeners.push(setupAudio)
    await context.loader.load(manifest.build == 'production' ? productionResources : resources)
    const navigation: Navigation = new Navigation()
    navigation.navigateWelcomeScreen()
}
