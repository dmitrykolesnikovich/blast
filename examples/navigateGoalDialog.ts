import * as resources from "../res"
import {bootstrap, context} from "../src/engine"
import Navigation from "../src/features/navigation"

bootstrap(navigateGoalDialog)

async function navigateGoalDialog() {
    await context.loader.load(resources)
    const navigation: Navigation = new Navigation()
    navigation.navigateGoalDialog(0)
}
