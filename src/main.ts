import './style.css'

class DVDVideo {
    canvas: HTMLCanvasElement = document.getElementById('dvd-video-canvas') as HTMLCanvasElement

    constructor() {
        this.init()
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
