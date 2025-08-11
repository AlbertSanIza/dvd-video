import './style.css'

class DVDVideo {
    canvas: HTMLCanvasElement = document.getElementById('dvd-video-canvas') as HTMLCanvasElement
    ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D

    constructor() {
        this.setupEventListeners()
    }

    resize() {
        const { width, height } = this.canvas.getBoundingClientRect()
        this.canvas.width = width
        this.canvas.height = height
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize())
    }

    private update() {}

    private draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    private gameLoop() {
        this.update()
        this.draw()
        requestAnimationFrame(() => this.gameLoop())
    }
}

new DVDVideo()
