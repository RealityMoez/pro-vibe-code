import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import './index.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
      </main>
      <footer className="py-8 text-center text-gray-500 border-t border-gray-100 dark:border-gray-800 dark:text-gray-400">
        <p>© 2025 JD. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
