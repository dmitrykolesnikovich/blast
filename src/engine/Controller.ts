import {Container, IPointData} from "pixi.js"
import {View} from "./View"
import {bindAction, bindObjectProperties} from "./Reflection"

export type ActionListener = (action: string, event?: any) => void

type Listener<T extends Controller = any> = (controller: T, args: any) => void

export class Controller {

    view: View<any>

    private readonly actionMap: Map<string, Listener[]> = new Map()
    private isCanceled: boolean = false

    constructor(actions: Object = {}) {
        for (const [action, listener] of Object.entries(actions)) {
            this.on(action, this.bindViewModel(listener))
        }
        bindObjectProperties(this, this.updateViewModel.bind(this))
    }

    on(action: string, listener: Listener) {
        const listeners: Listener[] | undefined = this.actionMap.get(action)
        if (listeners !== undefined) {
            listeners.push(listener)
        } else {
            this.actionMap.set(action, [listener])
        }
    }

    emit(action: string, event?: any) {
        const listeners: Listener[] | undefined = this.actionMap.get(action)
        if (listeners !== undefined) {
            for (let listener of listeners) {
                listener(this, event)
            }
        }
    }

    cancel() {
        this.isCanceled = true
    }

    down(target: Container, action: string, event?: any) {
        target.eventMode = 'dynamic'
        target.on('pointerdown', (pointer) => {
            pointer.stopPropagation()
            const point: IPointData = target.toLocal(pointer.global)
            this.emit(action, {target, action, point, ...event})
        })
    }

    move(target: Container, action: string, event?: any) {
        target.eventMode = 'dynamic'
        target.on('pointermove', (pointer) => {
            pointer.stopPropagation()
            const point: IPointData = target.toLocal(pointer.global)
            this.emit(action, {target, action, point, ...event})
        })
    }

    up(target: Container, action: string, event?: any) {
        target.eventMode = 'dynamic'
        target.on('pointerup', (pointer) => {
            pointer.stopPropagation()
            const point: IPointData = target.toLocal(pointer.global)
            this.emit(action, {target, action, point, ...event})
        })
    }

    /*internals*/

    private bindViewModel<T>(context: T): T {
        const updateViewModel = this.updateViewModel.bind(this)
        if (context instanceof Function) {
            return bindAction(context, updateViewModel) as T
        } else {
            bindObjectProperties(context, updateViewModel)
            return context
        }
    }

    private updateViewModel() {
        if (this.isCanceled) {
            this.isCanceled = false
            return
        }
        if (!this.view.isInitialized) {
            this.view.init(this)
            this.view.initListeners(this)
            this.view.isInitialized = true
        }
        this.view.update(this)
        this.view.updateListeners(this)
    }

}
