type Listener<T extends EventBus = any> = (eventBus: T, args: any) => void

export class EventBus {

    private readonly actionMap: Map<string, Listener[]> = new Map()

    constructor(actions: Object = {}) {
        for (const [action, listener] of Object.entries(actions)) {
            this.on(action, listener)
        }
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

}
