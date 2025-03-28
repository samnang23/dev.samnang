"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Mouse position
    let mouseX = 0
    let mouseY = 0
    const mouseRadius = 300

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Create particles
    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number = 0
      y: number = 0
      size: number = 0
      baseX: number = 0
      baseY: number = 0
      density: number = 0
      color: string = ""
      angle: number = 0
      velocity: number = 0

      constructor() {
        const canvas = canvasRef.current
        if (!canvas) return

        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 2 // Slightly larger particles
        this.baseX = this.x
        this.baseY = this.y
        this.density = Math.random() * 30 + 1
        this.angle = Math.random() * 360
        this.velocity = Math.random() * 0.2 + 0.1

        // Enhanced color palette with more vibrant colors
        const colors = [
          [59, 130, 246], // Blue
          [239, 68, 68],  // Red
          [99, 102, 241], // Indigo
          [236, 72, 153]  // Pink
        ]
        const selectedColor = colors[Math.floor(Math.random() * colors.length)]
        const opacity = Math.random() * 0.5 + 0.3
        this.color = `rgba(${selectedColor[0]}, ${selectedColor[1]}, ${selectedColor[2]}, ${opacity})`
      }

      draw() {
        const ctx = canvasRef.current?.getContext("2d")
        if (!ctx) return

        ctx.save()
        ctx.fillStyle = this.color
        ctx.shadowColor = this.color
        ctx.shadowBlur = 15
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }

      update() {
        // Calculate distance between mouse and particle
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Add subtle organic movement
        this.angle += this.velocity
        const movement = Math.sin(this.angle) * 0.5

        if (distance < mouseRadius) {
          // Enhanced repulsion effect with smooth easing
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const maxDistance = mouseRadius
          const force = (maxDistance - distance) / maxDistance
          const easing = force * force // Quadratic easing
          const directionX = forceDirectionX * easing * this.density * 2
          const directionY = forceDirectionY * easing * this.density * 2

          this.x -= directionX
          this.y -= directionY
        } else {
          // Organic movement when returning to base position
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX
            this.x -= dx / 20 + movement
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY
            this.y -= dy / 20 + movement
          }
        }
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fill background with dark color
      ctx.fillStyle = "rgba(10, 10, 20, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw and update particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw connections between particles
      connectParticles()

      requestAnimationFrame(animate)
    }

    // Connect particles with lines
    const connectParticles = () => {
      const maxDistance = 150

      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            // Enhanced opacity calculation with smooth falloff
            const opacity = Math.pow(1 - distance / maxDistance, 2) * 0.5

            // Create more vibrant connections
            const gradient = ctx.createLinearGradient(
              particles[a].x,
              particles[a].y,
              particles[b].x,
              particles[b].y
            )

            // Extract color values for smooth transitions
            const colorA = particles[a].color.match(/\d+/g)
            const colorB = particles[b].color.match(/\d+/g)

            if (colorA && colorB) {
              gradient.addColorStop(0, `rgba(${colorA[0]}, ${colorA[1]}, ${colorA[2]}, ${opacity})`)
              gradient.addColorStop(1, `rgba(${colorB[0]}, ${colorB[1]}, ${colorB[2]}, ${opacity})`)
            }

            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      <div className="fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-[50px] -z-10"></div>
    </>
  )
}

