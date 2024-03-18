import {Container, IPointData} from "pixi.js"
import {View} from "./View"

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
            this.view.isInitialized = true
        }
        this.view.update(this)
    }

}

/*internals*/

function bindAction(action: Function, complete: () => void): Function {
    return function (...args: any) {
        const result: any = action(...args)
        if (result instanceof Promise) {
            result.then(complete)
        } else {
            complete()
        }
    }
}

function bindObjectProperties(object: any, complete: () => void) {
    for (const key of Object.keys(object)) {
        let oldValue: any = object[key]
        let newValue: any = oldValue
        Object.defineProperty(object, key, {
            configurable: true,
            enumerable: true,
            get: () => {
                return newValue
            },
            set: (value) => {
                if (value === newValue) return

                oldValue = newValue
                newValue = value
                complete()
            },
        })
    }
}
