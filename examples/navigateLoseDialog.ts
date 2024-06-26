import * as resources from "../res"
import {bootstrap, context} from "../src/engine"
import Navigation from "../src/features/navigation"

bootstrap(navigateLoseDialog)

async function navigateLoseDialog() {
    await context.loader.load(resources)
    const navigation: Navigation = new Navigation()
    navigation.navigateLoseDialog()
}
