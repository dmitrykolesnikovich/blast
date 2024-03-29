import {Application, Assets, Container, Spritesheet, Text} from "pixi.js"
import {delay} from "./Timer"
import {Environment} from "./Environment"
import {debug} from "./Debug"
import {quickfixSoundForProduction, quickfixSpritesheetForProduction} from "./Production"
import {context} from "./Engine"
import {Howl} from "howler"

type FontInstance = { url: string, family: string, weight: string }

type ProgressListener = (progress: number/*0..1*/) => void

type Resources = string | string[] | object

export class Loader {

    private readonly app: Application
    private readonly urls: string[] = []
    private readonly fonts: FontInstance[] = []
    private _isCompleted: boolean = false

    readonly progressListeners: ProgressListener[] = []
    readonly completeListeners: Function[] = []

    constructor(app: Application) {
        this.app = app
    }

    add(resources: Resources): Loader {
        if (Array.isArray(resources)) {
            resources.forEach((resource) => this.add(resource))
        } else if (typeof resources === 'string') {
            this.urls.push(resources)
        } else {
            Object.values(resources).forEach((resource) => this.add(resource))
        }
        return this
    }

    ensureFont(font: FontInstance): Loader {
        this.fonts.push(font)
        return this
    }

    async load(resources: Resources, ...complete: Function[]) {
        context.loader.completeListeners.push(...complete)
        await this.add(resources).complete()
    }

    async complete() {
        for (const url of this.urls) {
            Assets.add(url, url)
            debug(`load: ${url}`)
            const asset: any = await Assets.load(url)
            if (asset instanceof Spritesheet) quickfixSpritesheetForProduction(asset) // todo improve
            if (asset instanceof Howl) quickfixSoundForProduction(url, asset) // todo improve
            const progress: number = this.urls.indexOf(url) / this.urls.length
            this.onProgress(progress)
        }
        this.loadingCompleted()
        await this.clearFontCaches(Environment.cacheAwareDuration)
    }

    loadingCompleted() {
        this._isCompleted = true
        this.onProgress(1)
    }

    push(url: string | string[]): Loader {
        // noinspection JSIgnoredPromiseFromCall todo track all background loads
        Assets.backgroundLoad(url)
        return this
    }

    async pop(url: string) {
        await Assets.load(url)
    }

    get isCompleted(): boolean {
        return this._isCompleted
    }

    /*internals*/

    private onProgress(progress: number) {
        this.progressListeners.forEach(listener => listener(progress))
        if (progress === 1) {
            this.completeListeners.forEach(listener => listener(progress))
        }
    }

    private async clearFontCaches(duration: number) {
        const cyrillics: Container<Text> = this.app.stage.addChild(new Container<Text>())
        const latins: Container<Text> = this.app.stage.addChild(new Container<Text>())
        for (const {family, weight} of this.fonts) {
            cyrillics.addChild(new Text('старый', {fontSize: 0, fontFamily: family, fontWeight: weight as any}))
            latins.addChild(new Text('old', {fontSize: 0, fontFamily: family, fontWeight: weight as any}))
        }
        return new Promise<void>((resolve) => {
            delay(duration / 2, () => {
                for (const cyrillic of cyrillics.children) cyrillic.text = 'новый'
                for (const latin of latins.children) latin.text = 'new'
                delay(duration / 2, () => {
                    cyrillics.removeFromParent()
                    latins.removeFromParent()
                    resolve()
                })
            })
        })
    }

}
