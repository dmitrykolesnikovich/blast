import {ISize, Texture} from 'pixi.js'

export function VerticalGradient(size: ISize, color1: string, color2: string): Texture {
    const canvas: HTMLCanvasElement = document.createElement("canvas")
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d")
    if (context === null) throw new Error()
    const gradient: CanvasGradient = context.createLinearGradient(0, 0, 0, size.height)
    gradient.addColorStop(0, color1)
    gradient.addColorStop(1, color2)
    context.fillStyle = gradient
    context.fillRect(0, 0, size.width, size.height)
    return Texture.from(canvas)
}
