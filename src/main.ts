import {bootstrap, context} from "./standard"
import * as resources from "../res"
import dynamiteExample from "./dynamiteExample"

bootstrap(main)

async function main() {
    await context.loader.load(resources)
    dynamiteExample()
}
