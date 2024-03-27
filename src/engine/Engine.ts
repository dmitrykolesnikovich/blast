import {Application, Assets, extensions} from "pixi.js"
import {Context} from "./Context"
import {Layout} from "./Layout"
import {Loader} from "./Loader"
import {Environment} from "./Environment"
import {initializeAudio} from "./Audio"

export const context: Context = new Context()

export function bootstrap(main: () => void) {
    window.parent?.window?.postMessage({playdeck: {method: "loading"}}, "*") // quickfix todo improve
    window.addEventListener('DOMContentLoaded', async () => {
        await initializeEnvironment()
        initializeContext()
        await animateLoading(async () => {
            await main()
            context.loader.loadingCompleted()
        })
    })
}

/*initialize*/

async function initializeEnvironment() {
    Environment.app = (document.getElementById("app") ?? document.body.appendChild(document.createElement('div'))) as HTMLDivElement // 1. app
    Environment.loader = document.getElementById("loader") as HTMLDivElement | null // 2. loader
    Environment.canvas = (document.getElementById('app-canvas') ?? Environment.app.appendChild(document.createElement('canvas'))) as HTMLCanvasElement // 3. canvas
    await Assets.init({basePath: Environment.basePath}) // 4. basePath
}

function initializeContext(): Context {
    const {canvas} = Environment

    context.app = new Application({
        background: Environment.background,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        view: canvas,
        resizeTo: canvas,
        sharedTicker: true,
    })
    context.loader = new Loader(context.app)
    context.layout = initializeLayout()
    initializeAudio()

    return context
}

function initializeLayout(): Layout {
    const layout: Layout = new Layout()
    window.addEventListener('resize', () => layout.resize())
    window.addEventListener('orientationchange', () => layout.resize())
    return layout
}

/*load*/

// todo actually animate it using blur fade-out maybe?
async function animateLoading(block: () => void) {
    const {loader, canvas} = Environment
    if (loader) loader.style.display = 'flex'
    canvas.style.display = 'none'
    await block()
    if (loader) loader.style.display = 'none'
    canvas.style.display = 'flex'
    window.dispatchEvent(new Event('resize'))
}
