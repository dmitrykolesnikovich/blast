import {Downgrade, isModificationEmpty, Modification, Upgrade} from "../types/Modification"
import {playSound} from "../engine"
import {
    coinsMp3,
    downgradeMp3,
    streakDynamiteMp3,
    streakGroupMp3,
    streakMixMp3,
    streakResetMp3,
    streakUndefinedMp3,
    streakVerticalOrHorizontalMp3
} from "../../res"

export function playModificationSound(modification: Modification) {
    if (modification instanceof Upgrade)
        playSound(resolveUpgradeSound(modification))
    if (modification instanceof Downgrade)
        playSound(resolveDowngradeSound(modification))
}

function resolveUpgradeSound(upgrade: Upgrade): string {
    if (isModificationEmpty(upgrade)) return streakUndefinedMp3
    switch (upgrade.backward.hit.type) {
        case 'ProduceHorizontal':
        case 'ProduceVertical':
        case 'ProduceDynamite':
        case 'ProduceReset':
            return coinsMp3
        case 'ConsumeHorizontal':
        case 'ConsumeVertical':
            return streakVerticalOrHorizontalMp3
        case 'ConsumeDynamite':
            return streakDynamiteMp3
        case 'ConsumeReset':
            return streakResetMp3
        case 'ConsumeBlock':
            return streakGroupMp3
        case 'ButtonMix':
            return streakMixMp3
    }
}

function resolveDowngradeSound(upgrade: Upgrade): string {
    if (isModificationEmpty(upgrade)) return streakUndefinedMp3
    return downgradeMp3
}
