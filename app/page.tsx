"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import MobileNav from "@/components/mobile-nav"
import AnimatedBackground from "@/components/animated-background"

export default function Home() {
  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')

      if (anchor) {
        e.preventDefault()
        const targetId = anchor.getAttribute("href")

        if (targetId && targetId.startsWith("#")) {
          const targetElement = document.querySelector(targetId)

          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - 80, // Offset for header
              behavior: "smooth",
            })
          }
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)
    return () => document.removeEventListener("click", handleAnchorClick)
  }, [])

  return (
    <main className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="flex justify-between items-center py-4 sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md px-4 -mx-4">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Samnang Keo
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#home" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="#about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="#skills" className="text-gray-300 hover:text-white transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="text-gray-300 hover:text-white transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-full px-6">
              <Link href="#contact">Contact Me</Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <MobileNav />
        </header>

        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />

        <footer className="mt-20 py-8 text-center text-gray-400 border-t border-gray-800">
          <div className="flex justify-center gap-6 mb-6">
            <Link href="https://github.com/samnangkeo" className="hover:text-white transition-colors">
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://linkedin.com/in/samnangkeo" className="hover:text-white transition-colors">
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="mailto:contact@samnangkeo.com" className="hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
          <p>© {new Date().getFullYear()} Samnang Keo. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}

