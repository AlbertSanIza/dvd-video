import { Point } from './point'
import { Rectangle } from './rectangle'
import './style.css'

const COLORS = ['red', 'blue', 'green']
const SIZE = 300
const SPEED = 260

class DVDVideo {
    private canvas: HTMLCanvasElement = document.getElementById('dvd-video-canvas') as HTMLCanvasElement
    private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D

    private logo = new Image()
    private logoSize: { width: number; height: number } = { width: 0, height: 0 }
    private square: Rectangle
    private direction: Point
    private colorIndex = 0
    private color: string = COLORS[0]

    private lastTime = 0

    constructor() {
        this.setupEventListeners()
        this.resize()
        this.square = new Rectangle(new Point(Math.random() * Math.max(1, this.canvas.width), Math.random() * Math.max(1, this.canvas.height)), SIZE, SIZE)
        this.direction = new Point(Math.random() < 0.5 ? -1 : 1, Math.random() < 0.5 ? -1 : 1)
        this.logo.onload = () => {
            const padding = 0.05
            const maxW = this.square.width * (1 - padding * 2)
            const maxH = this.square.height * (1 - padding * 2)
            const scale = Math.min(maxW / this.logo.width, maxH / this.logo.height)
            this.logoSize = { width: this.logo.width * scale, height: this.logo.height * scale }
            requestAnimationFrame(this.gameLoop)
        }
        this.logo.src = `${import.meta.env.BASE_URL}/logo.png`
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
        let hasHit = false
        this.square.position.x += this.direction.x * SPEED * dt
        this.square.position.y += this.direction.y * SPEED * dt
        if (this.square.position.x <= 0) {
            this.square.position.x = 0
            this.direction.x *= -1
            hasHit = true
        } else if (this.square.position.x + this.square.width >= this.canvas.width) {
            this.square.position.x = this.canvas.width - this.square.width
            this.direction.x *= -1
            hasHit = true
        }
        if (this.square.position.y <= 0) {
            this.square.position.y = 0
            this.direction.y *= -1
            hasHit = true
        } else if (this.square.position.y + this.square.height >= this.canvas.height) {
            this.square.position.y = this.canvas.height - this.square.height
            this.direction.y *= -1
            hasHit = true
        }
        if (hasHit) {
            this.colorIndex = (this.colorIndex + 1) % COLORS.length
            this.color = COLORS[this.colorIndex]
        }
    }

    private draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // Rectangle
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.square.position.x, this.square.position.y, this.square.width, this.square.height)

        // Logo
        this.ctx.drawImage(
            this.logo,
            this.square.position.x + (this.square.width - this.logoSize.width) / 2,
            this.square.position.y + (this.square.height - this.logoSize.height) / 2,
            this.logoSize.width,
            this.logoSize.height
        )
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
