"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { FlutterIcon, DartIcon, FirebaseIcon, ApiIcon } from "@/components/tech-icons"

const TypingText = ({ text }: { text: string }) => {
  const words = text.split(" ")
  
  return (
    <div className="inline-flex gap-3">
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1,
              delay: wordIndex * 0.2,
              ease: [0.6, 0.01, -0.05, 0.95],
            }}
            className="inline-block"
          >
            <motion.span
              initial={{ backgroundPosition: "-100%" }}
              animate={{ backgroundPosition: "200%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "linear",
              }}
              className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[size:200%] bg-clip-text text-transparent"
            >
              {word}
            </motion.span>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

export default function HeroSection() {
  return (
    <section id="home" className="py-20 md:py-32">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl md:text-3xl font-medium text-blue-400 mb-2">
            HELLO <span className="inline-block animate-wave">👋</span> I&apos;M
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">Samnang Keo</h1>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-400 mb-6">AND I&apos;M</h2>
          <div className="text-4xl md:text-6xl font-bold mb-6">
            <TypingText text="Flutter Developer" />
          </div>
          <p className="text-gray-300 text-lg max-w-lg mb-8">
            Experienced Flutter developer adept at crafting innovative mobile solutions, leveraging cutting-edge
            technologies to build robust, user-centric applications.
          </p>
          <div className="flex gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full inline-block"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border border-gray-600 hover:border-gray-400 text-white font-medium py-3 px-8 rounded-full inline-block"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
            <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-full p-4 border border-gray-800 overflow-hidden">
              <Image
                src="https://samnang23.github.io/samnang.io/assets/samnang-ClYho9qj.png?height=500&width=500"
                width={500}
                height={500}
                alt="Samnang Keo"
                className="rounded-full object-cover"
                priority
              />
            </div>
          </div>

          <motion.div
            className="absolute top-0 right-0 md:-right-8"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <FlutterIcon className="w-16 h-16 md:w-20 md:h-20" />
          </motion.div>

          <motion.div
            className="absolute bottom-10 right-0"
            animate={{
              y: [0, 10, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0.5,
            }}
          >
            <DartIcon className="w-14 h-14 md:w-16 md:h-16" />
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-10"
            animate={{
              y: [0, -8, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
            }}
          >
            <FirebaseIcon className="w-14 h-14 md:w-16 md:h-16" />
          </motion.div>

          <motion.div
            className="absolute top-20 left-0"
            animate={{
              y: [0, 8, 0],
              rotate: [0, 3, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1.5,
            }}
          >
            <ApiIcon className="w-12 h-12 md:w-14 md:h-14" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

