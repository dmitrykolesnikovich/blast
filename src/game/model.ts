import {buildGroups} from "../features/groups"
import {Group} from "../types/Group"
import {Game} from "../types/Game"
import {clamp, flatArray} from "../engine"
import {Backward, convertForwardToBackward, Forward, isBackwardEmpty, shiftCellsForward} from "../features/shift"
import {Move, Version} from "../types/Modification"
import {initiateStreak} from "../features/streak"
import {Hit} from "../types/Hit"
import {Cell} from "../types/Cell"
import {Level} from "../types/Level"
import {Profile} from "../types/Profile"

export class GameModel {

    readonly profile: Profile = new Profile()
    #level: Level
    #game: Game
    #groups: Group[][]
    #move: Move
    #moves: number
    #mixTries: number
    #score: number

    // queries
    hasWin = (): boolean => this.score >= this.level.goal
    hasLose = (): boolean => (this.moves >= this.level.moves) || (!this.hasLegitimateMoves() && this.mixTries >= this.level.mixTries)
    hasLegitimateMoves = (): boolean => this.firstGroupStreak() !== undefined || this.firstBoosterCell() !== undefined
    firstBoosterCell = (): Cell | undefined => this.getCell(cell => cell.booster !== undefined)
    firstGroupStreak = (): Group | undefined => this.getGroup(group => group.cells.length >= this.#level.groupSize)
    getCell = (predicate: (cell: Cell) => boolean): Cell | undefined => flatArray(this.game.cells).find(cell => predicate(cell))
    getGroup = (predicate: (group: Group) => boolean): Group | undefined => flatArray(this.groups).find(group => predicate(group))

    set level(level: Level) {
        this.#level = level
        this.#mixTries = 0
        this.#score = 0
        this.#moves = 0
        this.game = {
            cells: level.cells,
            backwards: []
        }
    }

    get level(): Level {
        return this.#level
    }

    get game(): Game {
        return this.#game
    }

    get groups(): Group[][] {
        return this.#groups
    }

    get move(): Move {
        return this.#move
    }

    moveBegin() {
        this.move = {
            from: this.version,
            to: 0
        }
    }

    movePrevious() {
        this.move = {
            from: this.version,
            to: this.version - 1
        }
    }

    moveNext() {
        this.move = {
            from: this.version,
            to: this.version + 1
        }
    }

    moveEnd() {
        this.move = {
            from: this.version,
            to: this.lastVersion
        }
    }

    moveForward(hit: Hit) {
        if (this.hasWin()) return
        if (this.hasLose()) return

        const forward: Forward = initiateStreak(this, hit)
        const {cells, backwards} = this.game
        const previous: Version = this.version
        const backward: Backward = convertForwardToBackward(forward)
        this.game = {
            cells: shiftCellsForward(cells, forward),
            backwards: [backward, ...backwards]
        }
        const current: Version = this.version
        this.move = {from: previous, to: current}
        if (!isBackwardEmpty(backward)) this.#moves++
        switch (hit.type) {
            case 'ButtonMix': {
                this.#mixTries++
                break
            }
            case 'ProduceHorizontal':
            case 'ProduceVertical':
            case 'ProduceDynamite':
            case 'ProduceReset': {
                this.profile.coins -= this.level.price(hit.produce)
                break
            }
        }
        this.#score += this.level.score(backward.hit, backward.insert)
        if (this.hasWin()) this.profile.coins += this.level.coins
        if (this.hasLose()) this.profile.lives--
    }

    get moves(): number {
        return this.#moves
    }

    get mixTries(): number {
        return this.#mixTries
    }

    get score(): number {
        return this.#score
    }

    get version(): Version {
        return this.#move.to
    }

    get lastVersion(): Version {
        return this.#game.backwards.length
    }

    get isLastVersion(): boolean {
        return this.version === this.lastVersion
    }

    /*internals*/

    private set game(game: Game) {
        this.#game = game
        this.#groups = buildGroups(game.cells)
        this.#move = {
            from: this.lastVersion,
            to: this.lastVersion,
        }
    }

    private set move(move: Move) {
        this.#move = {
            from: clamp(move.from, 0, this.lastVersion),
            to: clamp(move.to, 0, this.lastVersion)
        }
    }

}
