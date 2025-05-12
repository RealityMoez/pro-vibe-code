import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const Header = ({ isDarkMode, setIsDarkMode }: { isDarkMode: boolean; setIsDarkMode: (value: boolean) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? isDarkMode 
          ? 'bg-gray-900 shadow-lg shadow-gray-900/20' 
          : 'bg-white shadow-lg shadow-gray-100/20'
        : isDarkMode
          ? 'bg-gray-900'
          : 'bg-white'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors dark:text-blue-400 dark:hover:text-blue-300">
          JD
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {['skills', 'experience', 'projects'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-blue-600 dark:after:bg-blue-400 after:scale-x-0 after:origin-right after:transition-transform hover:after:scale-x-100 hover:after:origin-left"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
          <button
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className="text-gray-700 dark:text-gray-200" />
            ) : (
              <Menu size={24} className="text-gray-700 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'tween', duration: 0.2 }}
            className={`fixed inset-0 top-[65px] z-40 md:hidden ${
              isDarkMode 
                ? 'bg-gray-900 border-t border-gray-800' 
                : 'bg-white border-t border-gray-100'
            }`}
          >
            <nav className="p-4">
              <ul className="space-y-4">
                {['skills', 'experience', 'projects'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item}`}
                      onClick={closeMenu}
                      className={`block py-2 px-4 text-lg rounded-lg transition-colors ${
                        isDarkMode
                          ? 'text-gray-200 hover:text-blue-400 hover:bg-gray-800'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
