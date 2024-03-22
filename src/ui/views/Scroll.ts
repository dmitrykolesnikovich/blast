import {Container, Graphics, IPointData, ISize, Rectangle} from "pixi.js"
import {animate, async, clamp, Environment} from "../../engine"

type ScrollOptions = {
    position: IPointData
    size: ISize
    items: Array<Container>
}

export default class Scroll extends Container {

    private readonly options: ScrollOptions
    private readonly background: Graphics = this.addChild(new Graphics())
    private readonly items: Container = this.addChild(new Container())

    constructor(options: ScrollOptions) {
        super()
        this.options = options
        const {position, size, items} = options

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
        })
        this.items.on('pointermove', (pointer) => {
            pointer.stopPropagation()
            if (isDown) {
                const point: IPointData = this.items.parent.toLocal(pointer.global)
                const dy: number = point.y - y
                if (dy != 0) {
                    this.items.position.y += dy
                    this.items.position.y = this.clampScrollY(this.items.position.y)
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
            } else if (latestForce !== 0) {
                const inertiaPath: number = latestForce * 10
                animate(0.88, (progress) => this.items.position.y = this.clampScrollY(sourceY + inertiaPath * Math.pow(progress, 0.12)))
            }
        })

        if (Environment.isDebugEnabled) this.background.beginFill('red').drawRect(0, 0, size.width, size.height).endFill()

        items.forEach(item => this.items.addChild(item))
    }

    clear() {
        this.items.removeChildren()
    }

    private clampScrollY(scrollY: number): number {
        const {size} = this.options
        return clamp(scrollY, size.height - this.items.height, 0)
    }

    invalidateScroll() {
        async(() => this.items.position.set(0, 0))
    }

}
