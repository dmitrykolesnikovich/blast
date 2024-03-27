import {Gender} from "../ui/views/Avatar"

class Settings {
    soundEnabled: boolean = true
    musicEnabled: boolean = true
    level: number = 1
    gender: Gender = 'girl'
    lives: number = 5
    coins: number = 0
}

export default new Settings()