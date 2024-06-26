import {Application, Ticker} from "pixi.js"
import {context} from "./Engine"
import {clamp} from "./Math"

export class Timer {

    private readonly ticker: Ticker
    private readonly task: () => void
    deltaTime: number = 0
    totalTime: number = 0
    onStart?: Function | undefined
    onStop?: Function | undefined

    constructor(ticker: Ticker, onTick: (timer: Timer) => void) {
        this.ticker = ticker
        this.task = () => {
            this.deltaTime = ticker.deltaMS * 0.001
            this.totalTime += this.deltaTime
            onTick(this)
        }
    }

    start() {
        this.ticker.add(this.task)
        if (this.onStart !== undefined) {
            this.onStart()
        }
    }

    stop() {
        this.ticker.remove(this.task)
        if (this.onStop !== undefined) {
            this.onStop()
        }
    }

}

export function startTimer(onTick: (timer: Timer) => void): Timer {
    const timer: Timer = createTimer(onTick)
    timer.start()
    return timer
}

export function createTimer(onTick: (timer: Timer) => void): Timer {
    const app: Application = context.app
    if (app == null) {
        throw new Error()
    }
    return new Timer(app.ticker, onTick)
}

export function async(task: () => void) {
    delay(0, task)
}

export function delay(seconds: number, task: () => void) {
    const app: Application = context.app
    if (app == null) {
        throw new Error()
    }

    // if (seconds <= 0) {
    //     task()
    //     return
    // }

    let currentMillis: number = seconds * 1000
    const delayedTask = () => {
        currentMillis -= app.ticker.deltaMS
        if (currentMillis <= 0) {
            task()
            app.ticker.remove(delayedTask)
        }
    }
    app.ticker.add(delayedTask)
}

export function animate(duration: number, onTick: (progress: number) => void) {
    startTimer((timer: Timer) => {
        const progress: number = clamp(timer.totalTime / duration, 0, 1)
        if (progress == 1) {
            timer.stop()
        }
        onTick(progress)
    })
}
