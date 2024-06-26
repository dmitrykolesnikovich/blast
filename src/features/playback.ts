import {GameModel} from "../game/model"
import {createTimer, delay, range, Timer} from "../engine"
import {buildCheckout, buildDowngrade, buildUpgrade, Downgrade, isModificationEmpty, Modification, Move, Version} from "../types/Modification"
import {GameController} from "../game/controller"

const FRAME_DURATION: number = 0.44

export type PlaybackEvent = { modification: Modification, duration: number }

export interface PlaybackDelegate {
    start(controller: GameController): void
    playback(controller: GameController, event: PlaybackEvent): void
    stop(controller: GameController): void
}

export class Playback {

    private readonly controller: GameController
    private readonly delegate: PlaybackDelegate
    private readonly timer: Timer
    private readonly modificationQueue: Modification[] = []
    private recentMove: Move
    private recentModification: Modification

    constructor(controller: GameController, delegate: PlaybackDelegate) {
        this.controller = controller
        this.delegate = delegate
        this.timer = createTimer(() => this.onTick())
    }

    start() {
        this.timer.start()
        this.delegate.start(this.controller)
        document.addEventListener('keydown', this.keyDown)
    }

    stop() {
        this.timer.stop()
        this.delegate.stop(this.controller)
        document.removeEventListener('keydown', this.keyDown)
    }

    get isEmpty(): boolean {
        return this.modificationQueue.isEmpty()
    }

    get size(): number {
        return this.modificationQueue.length
    }

    /*internals*/

    private onTick() {
        // read
        const model: GameModel = this.controller.model
        if (this.recentMove !== model.move) {
            this.recentMove = model.move
            const modifications: Modification[] = readPlayback(model)
            this.modificationQueue.push(...modifications)
        }

        // animate
        if (this.isEmpty) return
        if (this.recentModification === this.modificationQueue[0]) return
        this.recentModification = this.modificationQueue[0]
        this.delegate.playback(this.controller, {modification: this.recentModification, duration: this.duration})
        delay(this.duration * 0.9, () => this.modificationQueue.removeAt(0))
    }

    private keyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowUp':
                this.controller.emit('moveBegin')
                break
            case 'ArrowLeft':
                this.controller.emit('movePrevious')
                break
            case 'ArrowRight':
                this.controller.emit('moveNext')
                break
            case 'ArrowDown':
                this.controller.emit('moveEnd')
                break
        }
    }

    get duration(): number {
        const modification: Modification = this.recentModification
        if (isModificationEmpty(modification)) return FRAME_DURATION * 0.8
        return modification instanceof Downgrade ? FRAME_DURATION * 1.5 : FRAME_DURATION
    }

}

function readPlayback(model: GameModel): Modification[] {
    const {move, game} = model
    const modifications: Modification[] = []
    let versions: Version[]
    let buildModification: Function
    if (move.from < move.to) {
        versions = range(move.from + 1, move.to)
        buildModification = buildUpgrade
    } else if (move.from === move.to) {
        versions = [move.to]
        buildModification = buildCheckout
    } else {
        versions = range(move.from - 1, move.to)
        buildModification = buildDowngrade
    }
    for (const version of versions) {
        modifications.push(buildModification(game, version))
    }
    return modifications
}
