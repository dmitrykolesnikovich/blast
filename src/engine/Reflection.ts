export function bindAction(action: Function, complete: () => void): (...args: any) => void {
    return function (...args: any) {
        const result: any = action(...args)
        if (result instanceof Promise) {
            result.then(complete)
        } else {
            complete()
        }
    }
}

export function bindObjectProperties(object: any, complete: () => void) {
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