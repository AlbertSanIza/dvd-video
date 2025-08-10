import './style.css'

class DVDVideo {
    canvas: HTMLCanvasElement = document.getElementById('dvd-video-canvas') as HTMLCanvasElement
    width = 0
    height = 0

    constructor() {
        this.init()
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

    }

    init() {}

    update() {}

    draw() {}

    gameLoop() {
        this.update()
        this.draw()
        requestAnimationFrame(() => this.gameLoop())
    }
}

new DVDVideo()
