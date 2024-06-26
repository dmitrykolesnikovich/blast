import * as resources from "../res"
import {bootstrap, context} from "../src/engine"
import Navigation from "../src/features/navigation"

bootstrap(navigateWinDialog)

async function navigateWinDialog() {
    await context.loader.load(resources)
    new Navigation().navigateWinDialog()
}
