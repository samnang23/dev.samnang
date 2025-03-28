"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  FlutterIcon,
  DartIcon,
  FirebaseIcon,
  ApiIcon,
  GitIcon,
  FigmaIcon,
  SupabaseIcon,
  GetxIcon,
  IosIcon,
} from "@/components/tech-icons"

const skills = [
  {
    name: "Flutter",
    icon: FlutterIcon,
    description: "Expert in building cross-platform mobile applications with Flutter SDK",
  },
  {
    name: "Dart",
    icon: DartIcon,
    description: "Proficient in Dart programming language for building robust applications",
  },
  {
    name: "Firebase",
    icon: FirebaseIcon,
    description: "Experience with Firebase for authentication, database, and cloud functions",
  },
  {
    name: "Supabase",
    icon: SupabaseIcon,
    description: "Building applications with Supabase for backend, authentication, and real-time data",
  },
  {
    name: "GetX",
    icon: GetxIcon,
    description: "State management, routing, and dependency injection using GetX framework",
  },
  {
    name: "REST APIs",
    icon: ApiIcon,
    description: "Integration of RESTful APIs and handling asynchronous operations",
  },
  {
    name: "iOS & Android",
    icon: IosIcon,
    description: "Native platform integration and optimization for both iOS and Android",
  },
  {
    name: "Git",
    icon: GitIcon,
    description: "Version control and collaborative development using Git and GitHub",
  },
  {
    name: "UI/UX",
    icon: FigmaIcon,
    description: "Creating beautiful user interfaces with a focus on user experience",
  },
]

const TypingText = ({ text }: { text: string }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.1,
            delay: index * 0.03,
            repeat: Infinity,
            repeatDelay: text.length * 0.1 + 2,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const iconVariants = {
    initial: { 
      rotate: -15,
      scale: 0.9
    },
    animate: { 
      rotate: [0, -10, 10, -5, 5, 0],
      scale: [1, 1.1, 0.9, 1.05, 0.95, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    },
  }

  const cardVariants = {
    initial: {
      y: 0,
      scale: 1,
      boxShadow: "0 0 0 rgba(59, 130, 246, 0)"
    },
    animate: {
      y: [-5, 5, -5],
      scale: [1, 1.02, 1],
      boxShadow: [
        "0 0 20px rgba(59, 130, 246, 0)",
        "0 0 20px rgba(59, 130, 246, 0.3)",
        "0 0 20px rgba(59, 130, 246, 0)"
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  }

  return (
    <section id="skills" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          <TypingText text="Skills & Tech Stack" />
        </h2>
        <motion.div 
          className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"
          animate={{
            width: ["5rem", "10rem", "5rem"],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            className="bg-gradient-to-b from-gray-900/80 to-gray-900/40 backdrop-blur-xl rounded-xl p-6 border border-gray-800/50 hover:border-blue-500/50 transition-all duration-300 group"
          >
            <div className="flex items-center mb-4">
              <motion.div 
                variants={iconVariants}
                initial="initial"
                animate="animate"
                className="bg-gray-800/80 p-3 rounded-lg mr-4 group-hover:bg-blue-900/30 transition-all duration-300"
              >
                <skill.icon className="w-8 h-8" />
              </motion.div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                <TypingText text={skill.name} />
              </h3>
            </div>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              {skill.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

