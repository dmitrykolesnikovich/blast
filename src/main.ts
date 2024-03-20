import {bootstrap, context} from "./engine"
import * as resources from "../res"
import * as productionResources from "../gen"
import dynamiteExample from "../examples/dynamite.example"
import nineSlicePlaneExample from "../examples/nineSlicePlane.example"
import bradPng from "../examples/brad.png"
import texturePackerExample from "../examples/texturePacker.example"
import manifest from "./manifest";

bootstrap(main)

async function main() {
    await context.loader.load(manifest.build == 'production' ? productionResources : resources)
    dynamiteExample()
    // nineSlicePlaneExample()
    // texturePackerExample()
}
