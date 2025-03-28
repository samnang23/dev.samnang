"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Github, ExternalLink, Play, Pause, X } from "lucide-react"

const projects = [
  {
    title: "FlutterShop",
    description:
      "A feature-rich e-commerce mobile application built with Flutter and Firebase, featuring real-time inventory updates and secure payment processing.",
    image: "/placeholder.svg?height=600&width=800",
    video: "/videos/yai_mockup.mp4", // Replace with your actual video URL
    tags: ["Flutter", "Firebase", "Stripe", "State Management"],
    links: {
      github: "https://github.com/samnangkeo/fluttershop",
      live: "https://fluttershop.app",
    },
    hasLiveDemo: true,
    qrCode: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "TaskMaster",
    description:
      "A productivity app with task management, reminders, and progress tracking. Implements complex animations and offline-first architecture.",
    image: "/placeholder.svg?height=600&width=800",
    video: "/placeholder.svg?height=600&width=800", // Replace with your actual video URL
    tags: ["Flutter", "Hive", "Provider", "Notifications"],
    links: {
      github: "https://github.com/samnangkeo/taskmaster",
      live: "https://taskmaster.app",
    },
    hasLiveDemo: true,
    qrCode: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "WeatherNow",
    description:
      "A weather forecasting app with beautiful UI, location-based services, and interactive weather maps using Flutter and OpenWeather API.",
    image: "/placeholder.svg?height=600&width=800",
    video: "/placeholder.svg?height=600&width=800", // Replace with your actual video URL
    tags: ["Flutter", "REST API", "Animations", "Geolocation"],
    links: {
      github: "https://github.com/samnangkeo/weathernow",
      live: "https://weathernow.app",
    },
    hasLiveDemo: true,
    qrCode: "/placeholder.svg?height=200&width=200",
  },
]

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoRefs = useRef<HTMLVideoElement[]>([])

  useEffect(() => {
    setIsMounted(true)
    // Auto start the video when component mounts
    if (videoRef.current) {
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch(error => {
            console.log("Autoplay prevented:", error)
            setIsPlaying(false)
          })
      }
    }
  }, [currentIndex])

  const nextProject = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const prevProject = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }

  const toggleVideo = () => {
    if (!isMounted) return
    
    if (showVideo) {
      if (videoRef.current) {
        videoRef.current.pause()
      }
      setIsPlaying(false)
    } else {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.log("Playback prevented:", error)
        })
      }
      setIsPlaying(true)
    }
    setShowVideo(!showVideo)
  }

  const togglePlay = () => {
    if (!isMounted || !videoRef.current) return
    
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <section id="projects" className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-16">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ 
              duration: 0.7,
              type: "spring",
              stiffness: 100,
              damping: 12
            }}
            className="bg-gradient-to-b from-gray-900/80 to-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden shadow-2xl"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.2 }}
              transition={{ 
                delay: 0.2,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 12
              }}
              className="grid md:grid-cols-2 gap-8 p-8"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden group bg-black/90 shadow-xl ring-1 ring-gray-800/50">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                <video
                  ref={el => {
                    if (el) {
                      videoRefs.current[index] = el
                    }
                  }}
                  src={project.video}
                  className="absolute inset-0 w-full h-full object-contain"
                  autoPlay={index === 0}
                  loop
                  muted
                  playsInline
                  onClick={() => {
                    const video = videoRefs.current[index]
                    if (video) {
                      if (video.paused) {
                        video.play()
                      } else {
                        video.pause()
                      }
                    }
                  }}
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 flex items-center justify-center z-20">
                  <button className="bg-white/10 backdrop-blur-sm p-4 rounded-full hover:bg-white/20 transition-colors">
                    {videoRefs.current[index]?.paused ? (
                      <Play className="w-6 h-6 text-white" />
                    ) : (
                      <Pause className="w-6 h-6 text-white" />
                    )}
                  </button>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.2 }}
                transition={{ 
                  delay: 0.3,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 12
                }}
                className="flex flex-col justify-center space-y-6"
              >
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ amount: 0.2 }}
                        transition={{ 
                          delay: 0.4 + (tagIndex * 0.1),
                          duration: 0.5,
                          type: "spring",
                          stiffness: 100,
                          damping: 12
                        }}
                        className="bg-blue-900/20 text-blue-300 text-sm px-4 py-1.5 rounded-full border border-blue-800/30 shadow-sm"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </motion.a>
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl">
              <button
                onClick={toggleFullscreen}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                aria-label="Close fullscreen"
              >
                <X className="w-6 h-6" />
              </button>
              <video src={projects[currentIndex].video} className="w-full rounded-lg" autoPlay controls />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

