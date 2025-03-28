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
      x: number
      y: number
      size: number
      baseX: number
      baseY: number
      density: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.baseX = this.x
        this.baseY = this.y
        this.density = Math.random() * 30 + 1

        // Assign either blue or red color with random opacity
        const isBlue = Math.random() > 0.5
        const opacity = Math.random() * 0.5 + 0.2
        this.color = isBlue
          ? `rgba(59, 130, 246, ${opacity})` // Blue
          : `rgba(239, 68, 68, ${opacity})` // Red
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }

      update() {
        // Calculate distance between mouse and particle
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius) {
          // Create repulsion effect
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const maxDistance = mouseRadius
          const force = (maxDistance - distance) / maxDistance
          const directionX = forceDirectionX * force * this.density
          const directionY = forceDirectionY * force * this.density

          this.x -= directionX
          this.y -= directionY
        } else {
          // Return to original position
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX
            this.x -= dx / 10
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY
            this.y -= dy / 10
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
            // Calculate opacity based on distance
            const opacity = 1 - distance / maxDistance

            // Determine if line should be blue or red
            const isBlue = particles[a].color.includes("130")
            const isRed = particles[b].color.includes("68")

            // Create gradient for line
            const gradient = ctx.createLinearGradient(particles[a].x, particles[a].y, particles[b].x, particles[b].y)

            if (isBlue && isRed) {
              gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity * 0.5})`)
              gradient.addColorStop(1, `rgba(239, 68, 68, ${opacity * 0.5})`)
            } else if (isBlue) {
              gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity * 0.5})`)
              gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity * 0.3})`)
            } else {
              gradient.addColorStop(0, `rgba(239, 68, 68, ${opacity * 0.5})`)
              gradient.addColorStop(1, `rgba(239, 68, 68, ${opacity * 0.3})`)
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

