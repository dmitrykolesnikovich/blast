import {bootstrap, context} from "./engine"
import * as resources from "../res"
import dynamiteTest from "../test/dynamite.test"

bootstrap(main)

async function main() {
    await context.loader.load(resources)
    dynamiteTest()
}
