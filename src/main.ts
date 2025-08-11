import { Point } from './point'
import { Rectangle } from './rectangle'
import './style.css'

class DVDVideo {
    private canvas: HTMLCanvasElement = document.getElementById('dvd-video-canvas') as HTMLCanvasElement
    private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D
    private rectangle: Rectangle
    private logo = new Image()

    private velocity: Point
    private lastTime = 0

    constructor() {
        this.resize()
        const size = 200
        this.rectangle = new Rectangle(
            new Point(Math.random() * Math.max(1, this.canvas.width - size), Math.random() * Math.max(1, this.canvas.height - size)),
            size,
            size
        )

        const speed = 240
        const dirX = Math.random() < 0.5 ? -1 : 1
        const dirY = Math.random() < 0.5 ? -1 : 1
        this.velocity = new Point(speed * dirX, speed * dirY)

        this.logo.src = `${import.meta.env.BASE_URL}/logo.png`
        this.setupEventListeners()
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
        this.rectangle.position.x += this.velocity.x * dt
        this.rectangle.position.y += this.velocity.y * dt
        if (this.rectangle.position.x <= 0) {
            this.rectangle.position.x = 0
            this.velocity.x *= -1
        } else if (this.rectangle.position.x + this.rectangle.width >= this.canvas.width) {
            this.rectangle.position.x = this.canvas.width - this.rectangle.width
            this.velocity.x *= -1
        }
        if (this.rectangle.position.y <= 0) {
            this.rectangle.position.y = 0
            this.velocity.y *= -1
        } else if (this.rectangle.position.y + this.rectangle.height >= this.canvas.height) {
            this.rectangle.position.y = this.canvas.height - this.rectangle.height
            this.velocity.y *= -1
        }
    }

    private draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // Rectangle
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.rectangle.position.x, this.rectangle.position.y, this.rectangle.width, this.rectangle.height)

        // Image
        const padding = 0.05
        const maxW = this.rectangle.width * (1 - padding * 2)
        const maxH = this.rectangle.height * (1 - padding * 2)
        const scale = Math.min(maxW / this.logo.width, maxH / this.logo.height)
        const drawW = this.logo.width * scale
        const drawH = this.logo.height * scale
        const drawX = this.rectangle.position.x + (this.rectangle.width - drawW) / 2
        const drawY = this.rectangle.position.y + (this.rectangle.height - drawH) / 2
        this.ctx.drawImage(this.logo, drawX, drawY, drawW, drawH)
    }

    private gameLoop = (time: number) => {
        const dt = this.lastTime ? (time - this.lastTime) / 1000 : 0
        this.lastTime = time
        this.update(dt)
        this.draw()
        requestAnimationFrame(this.gameLoop)
    }
}

new DVDVideo()
