import {Cell} from "./Cell"
import {Hit} from "./Hit"
import {Forward} from "../features/shift"

export type Streak = {
    readonly from: Cell[]
    readonly to: Cell[]
}

export function pushStreak(hit: Hit, streak: Streak): Forward {
    return {
        hit,
        push: streak,
        insert: EmptyStreak()
    }
}

export function insertStreak(hit: Hit, streak: Streak): Forward {
    return {
        hit,
        push: EmptyStreak(),
        insert: streak
    }
}

export function EmptyStreak(): Streak {
    return {
        from: [],
        to: []
    }
}
