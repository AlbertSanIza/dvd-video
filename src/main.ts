import './style.css'
import type { Vec2 } from './types'

class DVDVideo {
    private canvas: HTMLCanvasElement = document.getElementById('dvd-video-canvas') as HTMLCanvasElement
    private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D
    private logo = new Image()

    // Bouncing rectangle properties
    size = { w: 200, h: 120 }
    pos: Vec2 = { x: 100, y: 100 }
    vel: Vec2 = { x: 220, y: 180 } // pixels per second

    // Timing
    private lastTime = 0

    // Logo
    private logo = new Image()
    private logoLoaded = false

    constructor() {
        this.setupEventListeners()
        this.resize()
        this.centerStart()
        this.loadLogo()
        requestAnimationFrame((t) => this.gameLoop(t))
    }

    private resize() {
        const { width, height } = this.canvas.getBoundingClientRect()
        // Use CSS pixels for simplicity here; good enough for solid fills
        this.canvas.width = Math.max(1, Math.floor(width))
        this.canvas.height = Math.max(1, Math.floor(height))

        // Ensure the rectangle stays within bounds after resize
        this.pos.x = Math.min(this.pos.x, this.canvas.width - this.size.w)
        this.pos.y = Math.min(this.pos.y, this.canvas.height - this.size.h)
        this.pos.x = Math.max(0, this.pos.x)
        this.pos.y = Math.max(0, this.pos.y)
    }

    private setupEventListeners() {
        window.addEventListener('resize', () => this.resize())
    }

    private centerStart() {
        // Start roughly centered with a random diagonal direction
        this.pos.x = (this.canvas.width - this.size.w) / 2
        this.pos.y = (this.canvas.height - this.size.h) / 2
        const speed = 240
        const angle = Math.random() * Math.PI * 2
        this.vel.x = Math.cos(angle) * speed
        this.vel.y = Math.sin(angle) * speed
        // Avoid near-axis motion which can look boring
        if (Math.abs(this.vel.x) < 80) this.vel.x = Math.sign(this.vel.x || 1) * 120
        if (Math.abs(this.vel.y) < 80) this.vel.y = Math.sign(this.vel.y || 1) * 120
    }

    private loadLogo() {
        this.logo.onload = () => (this.logoLoaded = true)
        // Respect Vite base path (e.g., GitHub Pages)
        this.logo.src = `${import.meta.env.BASE_URL}logo.png`
    }

    private update(dt: number) {
        // Move
        this.pos.x += this.vel.x * dt
        this.pos.y += this.vel.y * dt

        // Bounce on walls
        const maxX = this.canvas.width - this.size.w
        const maxY = this.canvas.height - this.size.h

        if (this.pos.x <= 0) {
            this.pos.x = 0
            this.vel.x *= -1
        } else if (this.pos.x >= maxX) {
            this.pos.x = maxX
            this.vel.x *= -1
        }

        if (this.pos.y <= 0) {
            this.pos.y = 0
            this.vel.y *= -1
        } else if (this.pos.y >= maxY) {
            this.pos.y = maxY
            this.vel.y *= -1
        }
    }

    private draw() {
        const { ctx } = this
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // Red bouncing rectangle
        ctx.fillStyle = 'red'
        ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h)

        // Draw logo centered inside the rectangle (optional if loaded)
        if (this.logoLoaded) {
            const padding = 12
            const targetW = Math.max(0, this.size.w - padding * 2)
            const targetH = Math.max(0, this.size.h - padding * 2)

            const scale = Math.min(targetW / this.logo.width, targetH / this.logo.height, 1)
            const drawW = this.logo.width * scale
            const drawH = this.logo.height * scale
            const cx = this.pos.x + this.size.w / 2
            const cy = this.pos.y + this.size.h / 2
            ctx.drawImage(this.logo, cx - drawW / 2, cy - drawH / 2, drawW, drawH)
        }
    }

    private gameLoop(now: number) {
        if (!this.lastTime) this.lastTime = now
        const dt = Math.min(0.05, (now - this.lastTime) / 1000) // clamp to avoid huge jumps
        this.lastTime = now

        this.update(dt)
        this.draw()
        requestAnimationFrame((t) => this.gameLoop(t))
    }
}

new DVDVideo()
