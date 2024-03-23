import {Gender} from "../ui/views/Avatar"

class Settings {
    soundEnabled: boolean = true
    musicEnabled: boolean = true
    gender: Gender
    lives: number
    coins: number
}

export default new Settings()