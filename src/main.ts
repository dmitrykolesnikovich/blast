import {bootstrap, context} from "./engine"
import * as resources from "../res"
import dynamiteExample from "../examples/dynamite.example"

bootstrap(main)

async function main() {
    await context.loader.load(resources)
    dynamiteExample()
}
