import {bootstrap, context} from "./engine"
import * as resources from "../res"
import productionResources from "../res/production"
import manifest from "./manifest"
import Navigation from "./features/navigation"
import {setupAudio} from "./features/sounds"

bootstrap(main)

async function main() {
    await context.loader.load(manifest.build == 'production' ? productionResources : resources, setupAudio)
    const navigation: Navigation = new Navigation()
    navigation.navigateWelcomeScreen()
}
