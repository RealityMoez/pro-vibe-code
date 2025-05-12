import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogSubtitle,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from '@/components/motion-primitives/dialog';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/motion-primitives/animated-background';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  details: string;
}

const projects = [
  {
    id: 1,
    title: "Quantum Weather",
    subtitle: "WEB APP",
    description: "Next.js weather app with ML-powered predictions",
    image: "",
    details: "Developed a weather forecasting application using Next.js, TailwindCSS, and a custom machine learning model. The app features real-time forecasts with 95% accuracy, location-based predictions, and interactive visualizations for temperature, precipitation, and air quality metrics. Implemented WebGL for 3D weather pattern visualization and deployed using Vercel with edge functions for optimal performance.",
  },
  {
    id: 2,
    title: "CodeMentor AI",
    subtitle: "SAAS PLATFORM",
    description: "AI-powered code review and learning platform",
    image: "",
    details: "Built a full-stack SaaS application that provides AI-powered code reviews and personalized learning paths for developers. Engineered with React, TypeScript, and Node.js on the backend. Features include real-time code analysis, error detection, style improvement suggestions, and learning resources tailored to user's coding patterns. Integrated with GitHub to analyze repositories and suggest improvements. Implemented a subscription model with Stripe integration.",
  },
  {
    id: 3,
    title: "EcoTrack",
    subtitle: "MOBILE APP",
    description: "Carbon footprint tracking with gamification",
    image: "",
    details: "Created a React Native mobile application that helps users track and reduce their carbon footprint through gamification. The app calculates emissions based on transportation choices, energy usage, and consumption habits. Features include barcode scanning for product sustainability ratings, social challenges with friends, and rewards for sustainable choices. Integrated with Apple HealthKit and Google Fit to track walking/cycling activities automatically.",
  },
  {
    id: 4,
    title: "Blockchain Voting",
    subtitle: "WEB3",
    description: "Secure e-voting system using blockchain",
    image: "",
    details: "Developed a decentralized voting platform using Ethereum smart contracts and Web3.js. The system ensures transparent, tamper-proof elections with verifiable results. Features include voter identity verification through ZK-proofs, real-time vote tallying, and complete audit trails. The frontend was built with React and Chakra UI, with MetaMask integration for wallet connectivity. Deployed on Polygon network for lower transaction costs and faster confirmation times.",
  },
  {
    id: 5,
    title: "Nutrient",
    subtitle: "CROSS-PLATFORM",
    description: "AI-powered nutrition planning and meal prep",
    image: "",
    details: "Built a cross-platform application using Flutter that provides personalized nutrition planning and meal preparation guidance. The app uses machine learning to analyze users' dietary preferences, restrictions, and health goals to generate customized meal plans. Features include image recognition for food logging, smart grocery lists, recipe recommendations based on available ingredients, and integration with food delivery services. Backend powered by Firebase with Cloud Functions for ML operations.",
  },
  {
    id: 6,
    title: "DevOps Dashboard",
    subtitle: "ENTERPRISE TOOL",
    description: "Unified platform for monitoring DevOps pipelines",
    image: "",
    details: "Engineered a comprehensive DevOps monitoring dashboard that aggregates metrics from various CI/CD tools, cloud services, and infrastructure components. Built with Vue.js frontend and Go microservices backend. The system provides real-time alerts, deployment tracking, performance metrics, and cost optimization recommendations. Features automated incident response workflows and integration with popular tools like GitHub Actions, Jenkins, Kubernetes, AWS, and Azure.",
  },
  {
    id: 7,
    title: "Spatial Notes",
    subtitle: "AR APPLICATION",
    description: "Augmented reality note-taking in 3D space",
    image: "",
    details: "Developed an innovative AR application that allows users to place digital notes and content in physical spaces. Built using Unity with ARKit/ARCore integration. The app enables users to attach text, images, videos, and 3D models to real-world locations, creating persistent spatial annotations accessible by others. Features include collaborative workspaces, voice-to-text input, gesture controls, and cloud synchronization across devices.",
  },
  {
    id: 8,
    title: "DataVault",
    subtitle: "SECURITY TOOL",
    description: "Zero-knowledge encrypted file storage system",
    image: "",
    details: "Created a zero-knowledge encrypted file storage system with client-side encryption that ensures only users with the correct keys can access their data. Built with Rust for performance-critical components and React for the frontend. Implemented end-to-end encryption, secure key management, file versioning, and granular access controls. The system features deduplication while maintaining encryption integrity and integrates with existing authentication systems via OIDC.",
  },
  {
    id: 9,
    title: "Soundscape",
    subtitle: "AI AUDIO",
    description: "AI-powered audio generation and manipulation",
    image: "",
    details: "Developed an advanced audio generation platform that uses deep learning to create original music, sound effects, and voice synthesis. Built with Python, TensorFlow, and WebAssembly for browser-based processing. Features include style transfer between audio samples, natural language instruction for audio generation, mood-based composition, and adaptive soundtrack creation for videos. The web interface provides intuitive controls for non-technical users to create production-quality audio.",
  },
  {
    id: 10,
    title: "MicroHealth",
    subtitle: "IOT SYSTEM",
    description: "Health monitoring through distributed IoT sensors",
    image: "",
    details: "Engineered an IoT health monitoring system that uses a network of small, unobtrusive sensors to track vital signs and environmental factors. Built with custom firmware for ESP32 microcontrollers and a React Native mobile application. The system provides continuous monitoring of heart rate, temperature, air quality, and activity levels. Features include anomaly detection algorithms, encrypted data transmission, long battery life through efficient power management, and integration with healthcare APIs.",
  },
];

// ProjectCard component: Renders an individual project card with dialog functionality
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Dialog>
      {/* DialogTrigger: Clickable area that opens the project details dialog */}
      <DialogTrigger className='w-full h-full'>
        <div className='flex flex-col h-full rounded-lg overflow-hidden'>
          {/* Project image or placeholder */}
          <div className="relative w-full h-48">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className='h-full w-full object-cover'
              />
            ) : (
              <div className='h-full w-full flex items-center justify-center'>
                <span className='text-zinc-400'>No image available</span>
              </div>
            )}
          </div>
          {/* Project title, subtitle, and description */}
          <div className='p-4 flex-grow flex flex-col justify-between'>
            <div>
              <h3 className='text-lg font-semibold text-zinc-200'>{project.title}</h3>
              <p className='text-sm text-zinc-300'>{project.subtitle}</p>
            </div>
            <p className='text-xs text-zinc-400 mt-2'>{project.description}</p>
          </div>
        </div>
      </DialogTrigger>
      {/* DialogContainer: Wrapper for the dialog content */}
      <DialogContainer>
        {/* Backdrop for the dialog */}
        <motion.div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        {/* DialogContent: The main content of the project details dialog */}
        <DialogContent
          className='pointer-events-auto relative flex h-auto w-full max-w-[500px] flex-col overflow-hidden bg-zinc-900 rounded-2xl'
        >
          {/* Project image in the dialog */}
          {project.image && (
            <DialogImage
              src={project.image}
              alt={project.title}
              className='h-64 w-full object-cover'
            />
          )}
          <div className='p-6'>
            {/* Project title in the dialog */}
            <DialogTitle className='text-2xl font-bold text-zinc-50'>
              {project.title}
            </DialogTitle>
            {/* Project subtitle in the dialog */}
            <DialogSubtitle className='text-lg text-zinc-400'>
              {project.subtitle}
            </DialogSubtitle>
            {/* Project description in the dialog with animation */}
            <DialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 },
              }}
            >
              <p className='mt-4 text-zinc-300'>
                {project.details}
              </p>
            </DialogDescription>
          </div>
          {/* Close button for the dialog */}
          <DialogClose className='absolute top-4 right-4 text-zinc-400 hover:text-zinc-200' />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
};

// Projects component: Renders the grid of project cards
const Projects = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="projects" className="py-16">
      <h2 className="text-4xl font-bold mb-8 text-white text-center">PROJECTS</h2>
      {/* Grid layout for project cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* AnimatedBackground: Provides hover effect for project cards */}
        <AnimatedBackground
          className='rounded-lg bg-zinc-100/30 dark:bg-zinc-800/10'
          transition={{
            type: 'spring',
            bounce: 0, 
            duration: 0.5, 
            stiffness: 1500, // stiffness for quicker response (+)
            damping: 100, // damping for smoother animation (+)
          }}
          enableHover
        >
          {/* Render individual ProjectCard components */}
          {projects.map((project) => (
            <div key={project.id} className="h-full w-full" data-id={`project-${project.id}`}>
              <ProjectCard project={project} />
            </div>
          ))}
        </AnimatedBackground>
      </div>
    </section>
  );
};

export default Projects;