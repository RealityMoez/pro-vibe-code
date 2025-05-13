import { motion } from 'framer-motion'

const ExperienceItem = ({
  title,
  company,
  period,
  description,
  index
}: {
  title: string
  company: string
  period: string
  description: string
  index: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="relative pl-8 pb-12 last:pb-0"
  >
    <div className="absolute left-0 h-full w-px bg-gradient-to-b from-blue-500 to-blue-200 dark:from-blue-400 dark:to-blue-900" />
    <div className="absolute left-[-5px] top-2 w-[11px] h-[11px] rounded-full border-2 border-blue-500 dark:border-blue-400 bg-white dark:bg-gray-900" />
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-colors">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">{company}</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 mb-3">{period}</p>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  </motion.div>
)

const Experience = () => {
  const experiences = [
    {
      title: "Frontend Developer",
      company: "Tech Startup",
      period: "2023 - Present",
      description: "Developing modern web applications using React and TailwindCSS. Implementing AI-powered features and maintaining high-quality code standards."
    },
    {
      title: "Computer Science Graduate",
      company: "University",
      period: "2019 - 2023",
      description: "Completed BS in Computer Science with focus on software engineering and artificial intelligence. Developed various projects using modern web technologies."
    },
    {
      title: "Web Development Intern",
      company: "Tech Company",
      period: "Summer 2022",
      description: "Worked on frontend development projects, collaborated with senior developers, and learned industry best practices."
    }
  ]

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900" id="experience">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-gray-900 dark:text-white"
        >
          Experience
        </motion.h2>
        <div className="relative">
          {experiences.map((exp, index) => (
            <ExperienceItem key={index} {...exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
