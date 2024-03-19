import {bootstrap, context} from "./engine"
import * as resources from "../res"
import dynamiteExample from "../examples/dynamite.example"
import nineSlicePlaneExample from "../examples/nineSlicePlaneExample"
import bradPng from "../examples/brad.png"

bootstrap(main)

async function main() {
    await context.loader.add(bradPng).load(resources)
    dynamiteExample()
    nineSlicePlaneExample()
}
