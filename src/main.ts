import {bootstrap, context} from "./engine"
import * as resources from "../res"
import * as productionResources from "../gen"
import manifest from "./manifest"
import navigate from "./features/navigate";
import WelcomeScreen from "./ui/WelcomeScreen";
import SettingsScreen from "./ui/SettingsScreen"

bootstrap(main)

async function main() {
    await context.loader.load(manifest.build == 'production' ? productionResources : resources)
    // dynamiteExample()
    // nineSlicePlaneExample()
    // texturePackerExample()
    navigate(new SettingsScreen())
}
