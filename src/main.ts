import './style.css'

class DVDVideo {
    private canvas: HTMLCanvasElement = document.getElementById('dvd-video-canvas') as HTMLCanvasElement
    private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D
    private logo = new Image()

    constructor() {
        this.resize()

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

    private update() {}

    private draw() {}

    private gameLoop() {
        this.update()
        this.draw()
        requestAnimationFrame(() => this.gameLoop())
    }
}

new DVDVideo()
