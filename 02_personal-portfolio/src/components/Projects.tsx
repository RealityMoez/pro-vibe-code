import { Code, Play, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

const ProjectCard = ({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  index
}: {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
  index: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 flex flex-col h-full"
  >
    <div className="flex-grow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <div className="flex gap-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-1.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              <Play size={18} className="transition-opacity duration-300 opacity-70 group-hover:opacity-100" />
              <span 
                className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out whitespace-nowrap flex items-center gap-1 pointer-events-none"
              >
                Live Demo
                <ExternalLink size={12} className="inline-block" />
              </span>
            </a>
          )}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-1.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
          >
            <Code size={18} className="transition-opacity duration-300 opacity-70 group-hover:opacity-100" />
            <span 
              className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out whitespace-nowrap flex items-center gap-1 pointer-events-none"
            >
              View Source
              <ExternalLink size={12} className="inline-block" />
            </span>
          </a>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/50"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
)

const Projects = () => {
  const projects = [
    {
      title: "AI-Powered Chat Application",
      description: "A real-time chat application with AI-powered features for smart responses and content moderation.",
      technologies: ['React', 'TypeScript', 'OpenAI API', 'TailwindCSS'],
      githubUrl: "https://github.com/realitymoez",
      liveUrl: "https://ai-chat-demo-nonexistent.com"
    },
    {
      title: "Portfolio Website",
      description: "A modern portfolio website built with React and TailwindCSS, featuring responsive design and smooth animations.",
      technologies: ['React', 'TailwindCSS', 'TypeScript'],
      githubUrl: "https://github.com/realitymoez"
    },
    {
      title: "E-commerce Dashboard",
      description: "An admin dashboard for e-commerce platforms with data visualization and inventory management.",
      technologies: ['React', 'Redux', 'TailwindCSS', 'Chart.js'],
      githubUrl: "https://github.com/realitymoez"
    },
    {
      title: "Weather App",
      description: "A weather application with location-based forecasts and beautiful UI animations.",
      technologies: ['React', 'Weather API', 'TailwindCSS'],
      githubUrl: "https://github.com/realitymoez",
      liveUrl: "https://weather-app-demo-nonexistent.com"
    }
  ]

  return (
    <section className="py-16 px-4 dark:bg-gray-900" id="projects">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8 text-gray-900 dark:text-white"
        >
          Featured Projects
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
