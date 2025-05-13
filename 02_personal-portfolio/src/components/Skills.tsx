import { motion } from 'framer-motion'

const SkillCard = ({ title, items, index }: { title: string; items: string[]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
  >
    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-default"
        >
          {item}
        </span>
      ))}
    </div>
  </motion.div>
)

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      items: ['HTML', 'CSS', 'JavaScript', 'React', 'TailwindCSS', 'TypeScript']
    },
    {
      title: "AI & Tools",
      items: ['LangChain', 'OpenAI API', 'Prompt Engineering', 'ChatGPT', 'AI Integration']
    },
    {
      title: "Development Tools",
      items: ['Git', 'VS Code', 'npm', 'Webpack', 'Vite']
    },
    {
      title: "Soft Skills",
      items: ['Problem Solving', 'Team Collaboration', 'Communication', 'Agile Methodology']
    }
  ]

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900" id="skills">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8 text-gray-900 dark:text-white"
        >
          Skills & Technologies
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              title={category.title}
              items={category.items}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
