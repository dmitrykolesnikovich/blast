import {Gender} from "../ui/views/Avatar"
import {getCookie, setCookie} from "../engine/Cookies"
import {clamp} from "../engine"

// todo cookie decorator
export class Profile {

    set level(level: number) {
        setCookie('level', clamp(level, 0, 15))
    }

    set coins(coins: number) {
        setCookie('coins', Math.max(0, coins))
    }

    set lives(lives: number) {
        setCookie('lives', clamp(lives, 0, 5))
    }

    set gender(gender: Gender) {
        setCookie('gender', gender)
    }

    set soundEnabled(soundEnabled: boolean) {
        setCookie('soundEnabled', soundEnabled)
    }

    set musicEnabled(musicEnabled: boolean) {
        setCookie('musicEnabled', musicEnabled)
    }

    get level(): number {
        return parseInt(getCookie('level', '0'))
    }

    get coins(): number {
        return parseInt(getCookie('coins', '0'))
    }

    get lives(): number {
        return parseInt(getCookie('lives', '5'))
    }

    get gender(): Gender {
        return getCookie('gender', 'girl') as Gender
    }

    get soundEnabled(): boolean {
        return getCookie('soundEnabled', 'true') === 'true'
    }

    get musicEnabled(): boolean {
        return getCookie('musicEnabled', 'true') === 'true'
    }

}
