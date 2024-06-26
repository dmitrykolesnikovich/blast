import * as resources from "../res"
import {bootstrap, context} from "../src/engine"
import Navigation from "../src/features/navigation"

bootstrap(navigateQuitDialog)

async function navigateQuitDialog() {
    await context.loader.load(resources)
    const navigation: Navigation = new Navigation()
    navigation.navigateQuitDialog()
}
