export {} // https://stackoverflow.com/a/65191023/909169

declare global {
    interface Array<T> {
        isEmpty(): boolean
        firstOrNull(): T | null
        lastOrNull(): T | null
        removeDuplicates(): Array<T>
        removeAt(index: number): T
        insertAt(index: number, element: T): void
        clear(): void
        shuffle(): this
    }
}

if (!Array.prototype.isEmpty) {
    Array.prototype.isEmpty = function (): boolean {
        return this.length == 0
    }
}

if (!Array.prototype.firstOrNull) {
    Array.prototype.firstOrNull = function <T>(): T | null {
        if (this.length == 0) return null
        return this[0]
    }
}

if (!Array.prototype.lastOrNull) {
    Array.prototype.lastOrNull = function <T>(): T | null {
        if (this.length == 0) return null
        return this[this.length - 1]
    }
}

if (!Array.prototype.removeDuplicates) {
    Array.prototype.removeDuplicates = function <T>(): Array<T> {
        return this.filter((item, index) => this.indexOf(item) === index)
    }
}

if (!Array.prototype.removeAt) {
    Array.prototype.removeAt = function <T>(index: number): T {
        const result: T = this[index]
        this.splice(index, 1)
        return result
    }
}

if (!Array.prototype.insertAt) {
    Array.prototype.insertAt = function <T>(index: number, element: T) {
        this.splice(index, 0, element)
    }
}

if (!Array.prototype.clear) {
    Array.prototype.clear = function <T>() {
        this.splice(0, this.length)
    }
}

// https://stackoverflow.com/a/2450976/909169
if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function () {
        let currentIndex: number = this.length
        while (currentIndex != 0) {
            const randomIndex: number = Math.floor(Math.random() * currentIndex)
            currentIndex--;
            [this[currentIndex], this[randomIndex]] = [this[randomIndex], this[currentIndex]]
        }
        return this
    }
}

export function arrayEquals(array1: any[], array2: any[]): boolean {
    return array1.length === array2.length && array1.every((val, index) => val === array2[index])
}

export function twoSetsEquals(set1: Set<any>, set2: Set<any>): boolean {
    return set1.size === set2.size && [...set1].every(value => set2.has(value))
}

export function forEach<T = {}>(array: T[][], each: (element: T) => void) {
    for (const row of array) {
        for (const element of row) {
            each(element)
        }
    }
}

export function flatArray<T = {}>(array: T[][]): T[] {
    return array.flatMap(it => it)
}
