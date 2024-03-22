import {bootstrap, context} from "./engine"
import * as resources from "../res"
import * as productionResources from "../gen"
import manifest from "./manifest"
import navigate from "./features/navigate"
import LevelChooserScreen from "./ui/LevelChooserScreen"
import settings from "./features/settings";

bootstrap(main)

async function main() {
    await context.loader.load(manifest.build == 'production' ? productionResources : resources)
    // dynamiteExample()
    // nineSlicePlaneExample()
    // texturePackerExample()
    settings.gender = 'girl'
    navigate(new LevelChooserScreen())
}
