import {Downgrade, isModificationEmpty, Modification, Upgrade} from "../types/Modification"
import {Board} from "../types/Board"
import {Cell} from "../types/Cell"
import {Tile} from "../types/Tile"
import gsap, {Back, Power2, Power3, Sine} from "gsap"
import {emitBlast} from "./particles"
import {check, clearAnimations, delay, forEach} from "../engine"
import {IPointData, ISize, Texture} from "pixi.js"
import {Booster} from "../types/Booster"
import {Hit} from "../types/Hit"
import {blockPng, boosterColorBombPng, boosterDynamitePng, boosterHorizontalBombPng, boosterVerticalBombPng, iconResetPng} from "../../res"
import {shiftGapsBackward} from "./shift"

export function playModificationAnimation(board: Board, modification: Modification, duration: number) {
    if (isModificationEmpty(modification)) {
        animateEmptyModification(board, modification, duration)
    } else if (modification instanceof Upgrade) {
        animateBoardUpgrade(board, modification, duration)
    } else if (modification instanceof Downgrade) {
        animateBoardDowngrade(board, modification, duration)
    }
}

/*internals*/

function animateEmptyModification(board: Board, modification: Modification, duration: number) {
    setupBoard(board, modification.to)
    if (modification instanceof Upgrade || modification instanceof Downgrade) {
        const hit: Hit = modification.backward.hit
        if (hit.consume !== undefined) {
            const tile: Tile = board.tiles[hit.consume.row][hit.consume.column]
            gsap.timeline()
                .set(tile.scale, {x: 1, y: 1})
                .to(tile.scale, {x: 0.88, y: 0.88, duration: duration * 0.5, ease: Power3.easeInOut})
                .to(tile.scale, {x: 1, y: 1, duration: duration * 0.5, ease: Power2.easeInOut})
            gsap.timeline()
                .set(tile, {angle: 0})
                .to(tile, {angle: -8, duration: duration * 0.22, ease: Power3.easeInOut})
                .to(tile, {angle: 16, duration: duration * 0.28, ease: Power3.easeInOut})
                .to(tile, {angle: -8, duration: duration * 0.28, ease: Power3.easeInOut})
                .to(tile, {angle: 0, duration: duration * 0.22, ease: Power3.easeInOut})
        }
    }
}

function animateBoardUpgrade(board: Board, upgrade: Upgrade, duration: number) {
    check('animateBoardUpgrade', duration >= 0.4)
    switch (upgrade.backward.hit.type) {
        case 'ProduceHorizontal':
        case 'ProduceVertical':
        case 'ProduceDynamite':
        case 'ProduceReset': {
            setupBoard(board, upgrade.to)
            const consume: Cell = upgrade.backward.hit.consume
            const tile: Tile = board.tiles[consume.row][consume.column]
            gsap.timeline()
                .set(tile, {alpha: 0, immediateRender: true})
                .to(tile, {alpha: 1, duration: duration / 2, ease: Sine.easeOut})
            break
        }

        case 'ConsumeHorizontal':
        case 'ConsumeVertical':
        case 'ConsumeDynamite':
        case 'ConsumeReset':
        case 'ConsumeBlock': {
            setupBoard(board, upgrade.from)
            upgrade.backward.insert.forEach(cell => {
                const tile: Tile = board.tiles[cell.row][cell.column]
                tile.visible = false
                if (cell.block !== undefined) {
                    emitBlast({
                        container: board,
                        position: tile.position,
                        size: tile.size,
                        tint: cell.block
                    })
                }
            })
            delay(0.1, () => {
                setupBoard(board, upgrade.to)
                const gaps: number[][] = shiftGapsBackward(upgrade.to, upgrade.backward)
                forEach(board.tiles, tile => {
                    const gap: number = gaps[tile.row][tile.column]
                    const fromY: number = tile.y - gap * resolveTileSize(board)
                    const toY: number = tile.y
                    gsap.timeline()
                        .animate(tile)
                        .set(tile, {y: fromY, immediateRender: true})
                        .to(tile, {y: toY, duration: duration - 0.1, ease: Sine.easeOut})
                })
                for (const remove of upgrade.backward.remove) {
                    const tile: Tile = board.tiles[remove.row][remove.column]
                    tile.position = resolveTilePosition(tile, remove)
                }
            })
            break
        }

        case 'ButtonMix': {
            setupBoard(board, upgrade.to)
            forEach(upgrade.to, (to) => animateTilePosition(board, to.original ?? to, to, duration))
            break
        }
    }
}

function animateBoardDowngrade(board: Board, downgrade: Downgrade, duration: number) {
    check('animateBoardDowngrade', duration >= 0.6)
    switch (downgrade.backward.hit.type) {
        case 'ProduceHorizontal':
        case 'ProduceVertical':
        case 'ProduceDynamite':
        case 'ProduceReset': {
            setupBoard(board, downgrade.to)
            const consume: Cell = downgrade.backward.hit.consume
            const tile: Tile = board.tiles[consume.row][consume.column]
            gsap.timeline()
                .set(tile, {alpha: 0, immediateRender: true})
                .to(tile, {alpha: 1, duration: duration / 2})
            gsap.timeline()
                .set(tile.scale, {x: 0.8, y: 0.8, ease: Back.easeOut})
                .to(tile.scale, {x: 1, y: 1, duration: duration / 1.5, ease: Back.easeOut})
            break
        }

        case 'ConsumeHorizontal':
        case 'ConsumeVertical':
        case 'ConsumeDynamite':
        case 'ConsumeReset':
        case 'ConsumeBlock': {
            setupBoard(board, downgrade.from)
            const gaps: number[][] = shiftGapsBackward(downgrade.from, downgrade.backward)
            forEach(board.tiles, tile => {
                const gap: number = gaps[tile.row][tile.column]
                const fromY: number = tile.y
                const toY: number = tile.y - gap * resolveTileSize(board)
                gsap.timeline()
                    .set(tile, {y: fromY, immediateRender: true})
                    .to(tile, {y: toY, duration: duration / 3, ease: Sine.easeOut})
                if (gap > tile.row) {
                    gsap.timeline()
                        .set(tile, {alpha: 1, immediateRender: true})
                        .to(tile, {alpha: 0, duration: duration / 3, ease: Sine.easeOut})
                }
            })
            for (const remove of downgrade.backward.remove) {
                const tile: Tile = board.tiles[remove.row][remove.column]
                tile.visible = false
            }
            delay(duration / 3 + 0.05, () => {
                setupBoard(board, downgrade.to)
                for (const cell of downgrade.backward.insert) {
                    const tile: Tile = board.tiles[cell.row][cell.column]
                    gsap.timeline()
                        .set(tile, {alpha: 0, immediateRender: true})
                        .to(tile, {alpha: 1, duration: duration - (duration / 3 + 0.12)})
                    gsap.timeline()
                        .set(tile.scale, {x: 0.8, y: 0.8, ease: Back.easeOut})
                        .to(tile.scale, {x: 1, y: 1, duration: duration - (duration / 3 + 0.05), ease: Back.easeOut})
                }
            })
            break
        }

        case 'ButtonMix': {
            setupBoard(board, downgrade.to)
            forEach(downgrade.from, (from) => animateTilePosition(board, from, from.original ?? from, duration))
            break
        }
    }
}

function animateTilePosition(board: Board, from: Cell, to: Cell, duration: number) {
    const tile: Tile = board.tiles[to.row][to.column]
    const fromPoint: IPointData = resolveTilePosition(tile, from)
    const toPoint: IPointData = resolveTilePosition(tile, to)
    gsap.timeline()
        .set(tile, {x: fromPoint.x, y: fromPoint.y, immediateRender: true})
        .to(tile, {x: toPoint.x, y: toPoint.y, duration: duration, ease: Sine.easeOut})
}

/*setup*/

function setupBoard(board: Board, cells: Cell[][]) {
    function setupTile(tile: Tile, cell: Cell) {
        clearAnimations(tile)
        tile.visible = true
        tile.alpha = 1
        setupTilePosition(tile, cell)
        setupTileSize(tile, cell)
        setupTileTexture(tile, cell)
    }

    function setupTilePosition(tile: Tile, cell: Cell) {
        tile.position = resolveTilePosition(tile, cell)
    }

    function setupTileSize(tile: Tile, cell: Cell) {
        const cellSize: number = resolveTileSize(tile.board)
        if (cell.booster !== undefined) {
            tile.sprite.width = cellSize * 0.9
            tile.sprite.height = cellSize * 0.9
        } else if (cell.block !== undefined) {
            tile.sprite.width = cellSize
            tile.sprite.height = cellSize * 192 / 171
        }
    }

    function setupTileTexture(tile: Tile, cell: Cell) {
        function resolveBoosterImage(booster: Booster): string {
            switch (booster) {
                case 'vertical':
                    return boosterVerticalBombPng
                case 'horizontal':
                    return boosterHorizontalBombPng
                case 'dynamite':
                    return boosterDynamitePng
                case 'reset':
                    return boosterColorBombPng
                case 'mix':
                    return iconResetPng
            }
        }

        if (cell.booster !== undefined) {
            tile.sprite.texture = Texture.from(resolveBoosterImage(cell.booster))
            tile.sprite.tint = 'white'
        } else if (cell.block !== undefined) {
            tile.sprite.texture = Texture.from(blockPng)
            tile.sprite.tint = cell.block
        }
    }

    board.position = resolveBoardPosition(board)
    board.size = resolveBoardSize(board)
    forEach(cells, (cell: Cell) => {
        const tile: Tile = board.tiles[cell.row][cell.column]
        setupTile(tile, cell)
    })
}

/*resolve*/

function resolveBoardPosition(board: Board): IPointData {
    const {rows, columns} = board.grid
    const cellSize: number = resolveTileSize(board)
    return {
        x: (450 - columns * cellSize) / 2,
        y: (800 - rows * cellSize) / 2
    }
}

function resolveBoardSize(board: Board): ISize {
    const {rows, columns} = board.grid
    return {
        width: 440,
        height: 440 / columns * rows
    }
}

function resolveTilePosition(tile: Tile, cell: Cell): IPointData {
    const cellSize: number = resolveTileSize(tile.board)
    return {
        x: cell.column * cellSize + cellSize / 2,
        y: cell.row * cellSize + cellSize / 2,
    }
}

function resolveTileSize(board: Board): number {
    const {rows, columns} = board.grid
    const cellSize: number = resolveBoardSize(board).width / columns
    return cellSize
}
