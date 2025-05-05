import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <div className="min-h-[90vh] flex flex-col justify-center max-w-4xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">Hello, I'm</h2>
        <div className="mb-4">
          <h1 className="text-5xl font-bold dark:text-white">John Doe</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 font-medium">John Smith Doe</p>
        </div>
        <p className="text-3xl font-light text-gray-700 dark:text-gray-300 mb-6">
          Software Engineer & AI Enthusiast
        </p>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Recent Computer Science graduate passionate about building modern web experiences
          and leveraging AI technologies. Specialized in front-end development with
          expertise in React, TailwindCSS, and various modern web technologies.
        </p>
        <motion.div 
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <a
            href="https://github.com/realitymoez"
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/"
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:john.doe@example.com"
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Mail size={24} />
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Hero
