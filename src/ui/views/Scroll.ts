import {Container, Graphics, IPointData, ISize, Rectangle} from "pixi.js"
import {animate, async, clamp, Environment} from "../../engine"
import Avatar from "./Avatar";

type ScrollOptions = {
    position: IPointData
    size: ISize
    avatar: Avatar,
    items: Array<Container>
    range: { min: number, max: number }
}

const MARGIN: number = 500

export default class Scroll extends Container {

    readonly options: ScrollOptions
    private readonly background: Graphics = this.addChild(new Graphics())
    readonly items: Container = this.addChild(new Container())

    constructor(options: ScrollOptions) {
        super()
        this.options = options
        const {position, size, items, avatar} = options

        this.position.copyFrom(position)
        let isDown: boolean = false
        let y: number
        this.mask = this.addChild(new Graphics().beginFill(0xffffff).drawRect(0, 0, size.width, size.height).endFill())

        this.items.interactive = true
        this.items.hitArea = new Rectangle(0, 0, size.width, size.height + 99999)

        let latestForce: number = 0
        this.items.on('pointerdown', (pointer) => {
            pointer.stopPropagation()
            isDown = true
            const point = this.items.parent.toLocal(pointer.global)
            y = point.y
            console.log(this.items.toLocal(pointer.global))
        })
        this.items.on('pointermove', (pointer) => {
            pointer.stopPropagation()
            if (isDown) {
                const point: IPointData = this.items.parent.toLocal(pointer.global)
                const dy: number = point.y - y
                if (dy != 0) {
                    this.items.position.y += dy
                    this.items.position.y = this.clampScrollY(this.items.position.y, MARGIN)
                    y = point.y
                    latestForce = dy
                }
            }
        })
        document.addEventListener('pointerup', (pointer) => {
            if (!this.isAttached()) return
            isDown = false

            // inertia
            const targetY: number = this.clampScrollY(this.items.position.y)
            const sourceY: number = this.items.position.y
            const deltaY: number = targetY - sourceY
            if (deltaY !== 0) {
                animate(0.3, (progress) => this.items.position.y = sourceY + deltaY * Math.pow(progress, 0.33))
            }
        })

        if (Environment.isDebugEnabled) this.background.beginFill('red').drawRect(0, 0, size.width, size.height).endFill()

        items.forEach(item => this.items.addChild(item))
        this.items.addChild(avatar)
    }

    scrollToEnd() {
        this.scrollTo(this.minY)
    }

    private clampScrollY(scrollY: number, margin: number = 0): number {
        const {range} = this.options
        return clamp(scrollY, Math.max(this.minY, range.min) - margin, Math.min(0, range.max) + margin)
    }

    private get minY(): number {
        const {size} = this.options
        return size.height - this.items.height
    }

    scrollTo(scrollY: number) {
        this.items.position.y = this.clampScrollY(scrollY)
    }

}
