import {bootstrap, context} from "./engine"
import * as resources from "../res"
import dynamiteExample from "../examples/dynamite.example"
import nineSlicePlaneExample from "../examples/nineSlicePlane.example"
import bradPng from "../examples/brad.png"
import texturePackerExample from "../examples/texturePacker.example"

bootstrap(main)

async function main() {
    await context.loader.load('./images/avatar.json')
    dynamiteExample()
    // nineSlicePlaneExample()
    // texturePackerExample()
}
