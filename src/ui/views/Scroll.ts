import {Color, Container, Graphics, IPointData, ISize, Rectangle} from "pixi.js"
import {
    adapt,
    Adaptive,
    animate,
    async,
    clamp,
    Direction,
    Environment,
    Orientation,
    AdaptiveElement,
    setupAdaptiveContainerLayout,
    AdaptiveContainer
} from "../../engine"
import Avatar from "./Avatar"
import LevelButton from "./LevelButton"

type ScrollLayout = {
    position: IPointData
    size: ISize
    avatar: Avatar,
    items: Array<Container>
    range: { min: number, max: number }
    fill?: Orientation
    gravity?: Direction
}

const MARGIN: number = 500

export default class Scroll extends Container implements AdaptiveElement {

    readonly layout: Adaptive<ScrollLayout>
    private readonly background: Graphics = this.addChild(new Graphics())
    readonly items: AdaptiveContainer
    readonly foreground: AdaptiveContainer

    constructor(layout: ScrollLayout) {
        super()
        const {position, size, items, avatar} = this.layout = adapt(layout, this)
        this.items = this.addChild(new AdaptiveContainer(this.layout))
        this.foreground = this.addChild(new AdaptiveContainer(this.layout))
        this.position.copyFrom(position)
        let isDown: boolean = false
        let y: number
        this.mask = this.addChild(new Graphics().beginFill(0xffffff).drawRect(-2000, 0, size.width + 4000, size.height).endFill())

        this.items.content.interactive = true
        this.items.content.hitArea = new Rectangle(0, 0, size.width, size.height + 99999)

        let latestForce: number = 0
        this.items.content.on('pointerdown', (pointer) => {
            pointer.stopPropagation()
            isDown = true
            const point = this.items.content.parent.toLocal(pointer.global)
            y = point.y
        })
        this.items.content.on('pointermove', (pointer) => {
            pointer.stopPropagation()
            if (isDown) {
                const point: IPointData = this.items.content.parent.toLocal(pointer.global)
                const dy: number = point.y - y
                if (dy != 0) {
                    this.scrollTo(this.clampScrollY(this.items.content.y + dy, MARGIN))
                    y = point.y
                    latestForce = dy
                }
            }
        })
        document.addEventListener('pointerup', (pointer) => {
            if (!this.isAttached()) return
            isDown = false

            // inertia
            const targetY: number = this.clampScrollY(this.items.content.y)
            const sourceY: number = this.items.content.y
            const deltaY: number = targetY - sourceY
            if (deltaY !== 0) {
                animate(0.3, (progress) => {
                    this.scrollTo(sourceY + deltaY * Math.pow(progress, 0.33))
                })
            }
        })

        if (Environment.isDebugEnabled) this.background.beginFill('red').drawRect(0, 0, size.width, size.height).endFill()

        items.forEach(item => this.items.content.addChild(item))
        this.items.content.addChild(avatar)
    }

    scrollToEnd() {
        this.scrollTo(this.clampScrollY(this.minY))
    }

    private clampScrollY(scrollY: number, margin: number = 0): number {
        const {range} = this.layout
        return clamp(scrollY, Math.max(this.minY, range.min) - margin, Math.min(0, range.max) + margin)
    }

    private get minY(): number {
        const {size} = this.layout
        return size.height - this.items.content.height
    }

    get buttons(): Array<LevelButton> {
        return this.items.content.children.filter(it => it instanceof LevelButton) as LevelButton[]
    }

    adaptElement(size: ISize) {
        const {fill, gravity} = this.layout
        setupAdaptiveContainerLayout(this.items, {size, fill, gravity}, this.foreground)
    }

    scrollTo(scrollY: number) {
        this.foreground.content.y = this.items.content.y = scrollY
    }

}
