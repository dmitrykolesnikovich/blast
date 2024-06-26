import {Container, Graphics, IPointData} from "pixi.js"
import Image from "./Image"
import gsap, {Sine} from "gsap"
import {progressBarPng} from "../../../res"
import {clamp} from "../../engine"

type ProgressLayout = {
    position: IPointData
}

export default class Progress extends Container {

    #progress: number = -1

    private readonly progressBar: Image = new Image({
        position: {x: 0, y: 0},
        size: {width: 200, height: 20},
        foreground: progressBarPng
    })

    constructor(layout: ProgressLayout) {
        super()
        const {position} = layout
        this.position = position
        this.addChild(new Graphics().beginFill(0xFAD8AE).drawRect(0, 0, 200, 20).endFill())
        this.addChild(this.progressBar)
    }

    set progress(progress: number) {
        progress = clamp(progress, 0, 1)
        const firstTime: boolean = this.#progress == -1
        this.#progress = progress
        gsap.timeline()
            .to(this.progressBar, {width: progress * 200, duration: firstTime ? 0 : 0.22, ease: Sine.easeIn})
    }

}
