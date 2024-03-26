import {Container, Graphics, IPointData} from "pixi.js"
import Image from "./Image"
import gsap, {Sine} from "gsap"
import {
    progressBarPng
} from "../../../res"

type ProgressOptions = {
    position: IPointData
}

export default class Progress extends Container {

    private _progress: number = -1

    private readonly progressBar: Image = new Image({
        position: {x: 0, y: 1},
        size: {width: 220, height: 24},
        foreground: progressBarPng
    })

    constructor(options: ProgressOptions) {
        super()
        const {position} = options
        this.position = position
        this.addChild(new Graphics().beginFill(0xFAD8AE).drawRect(0, 0, 220, 25).endFill())
        this.addChild(this.progressBar)
    }

    set progress(progress: number) {
        const firstTime: boolean = this._progress == -1
        this._progress = progress
        gsap.timeline()
            .to(this.progressBar, {width: progress * 220, duration: firstTime ? 0 : 2, ease: Sine.easeIn})
    }

}
