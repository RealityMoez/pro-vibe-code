import { Mail, Linkedin } from 'lucide-react'
import { Discord } from './icons/Discord'
import { Twitter } from './icons/Twitter'
import { Github } from './icons/Github'

export default function Footer() {
  return (
    <footer className="relative py-5 mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <a
            href="mailto:alex.taylor@example.com"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/alextaylorrr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://github.com/alextaylorrr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://x.com/alextaylorrrrr000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="X (formerly Twitter)"
          >
            <Twitter className="h-6 w-6 pt-0.5" />
          </a>
          <a
            href="https://discord.com/users/0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Discord"
          >
            <Discord className="h-6 w-6 pt-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}