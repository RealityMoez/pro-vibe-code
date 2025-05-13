"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin } from "lucide-react"
import GradualSpacing from "@/components/magicui/gradual-spacing"
import Link from 'next/link'
import Footer from '@/components/Footer'
import StickyDock from '@/components/StickyDock'
import Projects from '@/components/Projects'
import { InView } from '@/components/motion-primitives/in-view'

export default function Home() {
  // Array of professions to be displayed in the hero section
  const professions = [
    "Software Engineer",
    "Web Developer",
    "Prompt Engineer",
    "CS Enthusiast",
  ]
  // State for managing the current profession and its opacity
  const [currentProfession, setCurrentProfession] = useState(0)
  const [professionOpacity, setProfessionOpacity] = useState(0)
  // State for controlling the visibility of the sticky dock
  const [showDock, setShowDock] = useState(false)

  // Effect for cycling through professions
  useEffect(() => {
    const changeProfession = () => {
      setProfessionOpacity(0);
      setTimeout(() => {
        setCurrentProfession((prev) => (prev + 1) % professions.length);
        setProfessionOpacity(1);
      }, 500);
    };

    const initialDelay = setTimeout(() => {
      setProfessionOpacity(1);
    }, 2000);

    const interval = setInterval(changeProfession, 4000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [professions.length]);

  // Effect for showing the sticky dock after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setShowDock(true), 200)
    return () => clearTimeout(timer)
  }, [])

  // Animation variants for the InView component
  const inViewVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  };

  const inViewTransition = {
    duration: 1,
    ease: 'easeInOut',
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-black overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      </div>
      {/* Radial gradient background */}
      <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]">
      </div>
      
      {/* Sticky Dock */}
      <div className="flex justify-center w-full">
      <AnimatePresence>
        {showDock && (
          <motion.div 
            className="resize-with-width-sm fixed w-auto max-w-[90%] whitespace-nowrap px-4 py-2 z-50 top-4 bg-black/20 backdrop-blur-sm rounded-full"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 25, duration: 0.8 }}
          >
            <StickyDock />
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      <div className="relative z-10 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center">
          {/* Name with gradient text */}
          <h1 className="text-4xl font-bold mb-4 pt-10 text-center animate-fade-down animate-once animate-duration-500 animate-delay-0 animate-ease-in-out">
              <GradualSpacing
                text="Alex Taylor"
                /* sm:text-5xl md:text-5xl lg:text-7xl */
                className="resize-with-width-lg font-display text-center font-bold tracking-[-0.05em] pointer-events-none z-10 whitespace-pre-wrap flex-wrap bg-gradient-to-b from-[#ffffff] via-[#1a5bff82] to-[#ffd900] bg-clip-text leading-tight md:leading-none text-transparent"
                duration={0.5}
                delayMultiple={0.04}
                framerProps={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
              />
          </h1>
          
          {/* Animated profession text */}
          <div className="text-center mb-8 animate-fade-up animate-once animate-duration-500 animate-delay-200 animate-ease-in-out">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProfession}
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.5 }}
              >
                <GradualSpacing
                  text={professions[currentProfession]}
                  className={`font-display text-center text-2xl sm:text-4xl md:text-6xl font-bold tracking-[-0.08em] text-white dark:text-black whitespace-normal break-words leading-tight md:leading-normal transition-opacity duration-500`}
                  duration={0.5}
                  delayMultiple={0.04}
                  framerProps={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: professionOpacity, x: 0 },
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Subtitle */}
            <p className="mt-4 text-sm md:text-base">
                <GradualSpacing
                  text="I seek out, refine, and create new ideas"
                  className="font-display text-center bg-white bg-clip-text text-transparent tracking-[-0.05em] whitespace-normal overflow-wrap-normal break-words"
                  duration={0.2}
                  delayMultiple={0.015}
                  framerProps={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                />
            </p>
          </div>

          {/* Social links */}
          <motion.div 
            className="flex justify-center space-x-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {/* GitHub link */}
            <Link href="https://github.com/alextaylorrr" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="group relative inline-flex h-10 w-10 opacity-85 items-center justify-center rounded-full bg-neutral-50 text-neutral-50"
              >
                <div className="absolute inline-flex h-10 w-10 items-center justify-center border-2 rounded-full bg-neutral-50 transition-all">
                  <Github className="h-5 w-5 text-neutral-950" />
                </div>
                <div className="absolute inline-flex h-10 w-10 items-center justify-center border-2 border-cyan-600 rounded-full bg-neutral-700 opacity-0 transition-all duration-200 group-hover:opacity-100">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-50">
                    <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3H11.5C11.7761 3 12 3.22386 12 3.5V9C12 9.27614 11.7761 9.5 11.5 9.5C11.2239 9.5 11 9.27614 11 9V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                  </svg>
                </div>
              </Button>
            </Link>
            {/* LinkedIn link */}
            <Link href="https://www.linkedin.com/in/alextaylorrr/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="group relative inline-flex h-10 w-10 opacity-85 items-center justify-center rounded-full bg-neutral-50 text-neutral-50"
              >
                <div className="absolute inline-flex h-10 w-10 items-center justify-center border-2 rounded-full bg-neutral-50 transition-all">
                  <Linkedin className="h-5 w-5 text-neutral-950"/>
                </div>
                <div className="absolute inline-flex h-10 w-10 items-center justify-center border-2 border-cyan-600 rounded-full bg-neutral-700 opacity-0 transition-all duration-200 group-hover:opacity-100">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-50">
                    <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3H11.5C11.7761 3 12 3.22386 12 3.5V9C12 9.27614 11.7761 9.5 11.5 9.5C11.2239 9.5 11 9.27614 11 9V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                  </svg>
                </div>
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* About Me Section */}
        <InView variants={inViewVariants} transition={inViewTransition} viewOptions={{ once: true, amount: 0.5 }}>
          <section id="about" className="py-16">
            <h2 className="text-4xl font-bold mb-8 text-white text-center">ABOUT ME</h2>
            <div className="flex-wrap justify-center">
              <p className="text-center text-lg text-gray-300 mb-6">
                Full-stack developer with 5+ years of experience building modern web applications.
                <br/>
                Computer Science graduate specializing in cloud architecture and scalable systems.
              </p>
              <p className="text-center text-lg text-gray-300">
                Passionate about open-source contribution and exploring emerging technologies in AI and blockchain.
              </p>
            </div>
          </section>
        </InView>

        {/* Projects Section */}
        <InView variants={inViewVariants} transition={inViewTransition} viewOptions={{ once: true, amount: 0.1 }}>
          <Projects />
        </InView>

        {/* Skills Section */}
        <InView variants={inViewVariants} transition={inViewTransition} viewOptions={{ once: true, amount: 0.5 }}>
          <section id="skills" className="flex flex-col py-16 items-center">
            <h2 className="text-4xl font-bold mb-8 text-white text-center">SKILLS</h2>
            <div className="flex flex-wrap max-w-screen-md justify-center">
                {[
                  "JavaScript", "React", "HTML", "CSS", "Python", "Machine Learning",
                  "C", "C++", "C#", "Firebase", "Android", 
                  "Java", "SQL", "Software Testing"
                ].map((skill, index) => (
                  <Badge key={index} className="border-transparent transition-colors duration-300 text-lg py-2 px-4 text-black bg-white/20 hover:bg-black/20 hover:text-white/30 glowing-border">
                    {skill}
                  </Badge>
                ))}
            </div>
          </section>
        </InView>

        {/* Contact Section */}
        <InView variants={inViewVariants} transition={inViewTransition} viewOptions={{ once: true, amount: 0.5 }}>
          <section id="contact" className="py-16">
            <h2 className="text-4xl font-bold mb-8 text-white text-center">CONTACT</h2>
            <p className="text-lg text-gray-300 mb-6 text-center">
              Available for freelance projects and full-time positions. Reach out through any of the social links below.
            </p>
          </section>
        </InView>
      </div>
      {/* Footer Component */}
      <Footer />
    </div>
  )
}