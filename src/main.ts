import {bootstrap, context} from "./engine"
import * as resources from "../res"
import * as productionResources from "../gen"
import manifest from "./manifest"
import navigate from "./features/navigate"
import settings from "./features/settings"
import WinScreen from "./ui/WinScreen"

bootstrap(main)

async function main() {
    await context.loader.load(manifest.build == 'production' ? productionResources : resources)
    // dynamiteExample()
    // nineSlicePlaneExample()
    // texturePackerExample()
    settings.gender = 'girl'
    settings.lives = 5
    settings.coins = 88
    navigate(new WinScreen())
}
