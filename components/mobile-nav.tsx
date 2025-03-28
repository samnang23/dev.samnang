"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && !target.closest("[data-mobile-nav]")) {
        closeMenu()
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOpen])

  // Close menu when scrolling to a section
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        closeMenu()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isOpen])

  return (
    <div className="md:hidden" data-mobile-nav>
      <button
        onClick={toggleMenu}
        className="text-gray-300 hover:text-white transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 right-0 bg-gray-900/95 backdrop-blur-lg z-50 p-6 rounded-b-xl border border-gray-800"
          >
            <nav className="flex flex-col gap-4">
              <Link href="#home" onClick={closeMenu} className="text-gray-300 hover:text-white transition-colors py-2">
                Home
              </Link>
              <Link href="#about" onClick={closeMenu} className="text-gray-300 hover:text-white transition-colors py-2">
                About
              </Link>
              <Link
                href="#skills"
                onClick={closeMenu}
                className="text-gray-300 hover:text-white transition-colors py-2"
              >
                Skills
              </Link>
              <Link
                href="#projects"
                onClick={closeMenu}
                className="text-gray-300 hover:text-white transition-colors py-2"
              >
                Projects
              </Link>
              <Link
                href="#contact"
                onClick={closeMenu}
                className="text-gray-300 hover:text-white transition-colors py-2"
              >
                Contact
              </Link>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-full mt-2">
                Contact Me
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

