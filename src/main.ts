import { Point } from './point'
import { Rectangle } from './rectangle'
import './style.css'

class DVDVideo {
    private canvas: HTMLCanvasElement = document.getElementById('dvd-video-canvas') as HTMLCanvasElement
    private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D

    private square: Rectangle
    private logo = new Image()

    private velocity: Point
    private lastTime = 0

    constructor() {
        this.setupEventListeners()
        this.resize()
        const size = 200
        this.square = new Rectangle(
            new Point(Math.random() * Math.max(1, this.canvas.width - size), Math.random() * Math.max(1, this.canvas.height - size)),
            size,
            size
        )
        const speed = 240
        const dirX = Math.random() < 0.5 ? -1 : 1
        const dirY = Math.random() < 0.5 ? -1 : 1
        this.velocity = new Point(speed * dirX, speed * dirY)

        this.logo.src = `${import.meta.env.BASE_URL}/logo.png`
        requestAnimationFrame((t) => this.gameLoop(t))
    }

    private resize() {
        const { width, height } = this.canvas.getBoundingClientRect()
        this.canvas.width = width
        this.canvas.height = height
    }

    private setupEventListeners() {
        window.addEventListener('resize', () => this.resize())
    }

    private update(dt: number) {
        this.square.position.x += this.velocity.x * dt
        this.square.position.y += this.velocity.y * dt
        if (this.square.position.x <= 0) {
            this.square.position.x = 0
            this.velocity.x *= -1
        } else if (this.square.position.x + this.square.width >= this.canvas.width) {
            this.square.position.x = this.canvas.width - this.square.width
            this.velocity.x *= -1
        }
        if (this.square.position.y <= 0) {
            this.square.position.y = 0
            this.velocity.y *= -1
        } else if (this.square.position.y + this.square.height >= this.canvas.height) {
            this.square.position.y = this.canvas.height - this.square.height
            this.velocity.y *= -1
        }
    }

    private draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // Rectangle
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.square.position.x, this.square.position.y, this.square.width, this.square.height)

        // Image
        const padding = 0.05
        const maxW = this.square.width * (1 - padding * 2)
        const maxH = this.square.height * (1 - padding * 2)
        const scale = Math.min(maxW / this.logo.width, maxH / this.logo.height)
        const drawW = this.logo.width * scale
        const drawH = this.logo.height * scale
        const drawX = this.square.position.x + (this.square.width - drawW) / 2
        const drawY = this.square.position.y + (this.square.height - drawH) / 2
        this.ctx.drawImage(this.logo, drawX, drawY, drawW, drawH)
    }

    private gameLoop = (time: number) => {
        const dt = (time - this.lastTime) / 1000
        this.lastTime = time
        this.update(dt)
        this.draw()
        requestAnimationFrame(this.gameLoop)
    }
}

new DVDVideo()
