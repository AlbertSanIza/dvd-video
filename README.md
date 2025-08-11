# DVD Video

[![Deploy to Pages](https://github.com/AlbertSanIza/dvd-video/actions/workflows/deploy.yml/badge.svg)](https://github.com/AlbertSanIza/dvd-video/actions/workflows/deploy.yml)

A nostalgic recreation of the classic DVD screensaver animation that bounces around your screen and changes colors when it hits the edges. Built with TypeScript, Vite, and HTML5 Canvas.

🌐 **[Live Demo](https://albertsaniza.github.io/dvd-video)**

## Inspiration

This project was inspired by the iconic scene from The Office where the employees become mesmerized watching the DVD logo bounce around the screen, waiting for it to hit the corner perfectly.

📺 [Watch the scene: "The DVD Logo - The Office US"](https://www.youtube.com/watch?v=QOtuX0jL85Y)

## Features

- 🎯 Classic DVD logo bouncing animation
- 🌈 Color changes on edge collision (red, blue, green)
- 📱 Responsive design that works on all screen sizes
- ⚡ Smooth 60fps animation using requestAnimationFrame
- 🎨 Built with modern web technologies

## Tech Stack

- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **HTML5 Canvas** - For smooth 2D graphics
- **Tailwind CSS** - For styling
- **Bun** - Package manager and runtime

## Project Structure

```
src/
├── main.ts         # Main application logic
├── point.ts        # Point class for coordinates
├── rectangle.ts    # Rectangle class for the bouncing logo
├── style.css       # Global styles
└── vite-env.d.ts   # Vite environment types
```

## How It Works

The animation uses a simple physics simulation:

1. A logo bounces around inside a colored rectangle
2. The rectangle moves at constant velocity in X and Y directions
3. When the rectangle hits screen edges, it bounces back and changes color
4. The animation runs at 60fps using `requestAnimationFrame`
