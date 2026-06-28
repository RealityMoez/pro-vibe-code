export const portfolio = {
  name: 'NE0N',
  title: 'ARCHITECT',
  tagline: 'FULLSTACK_DEVELOPER',
  subtitle: 'CRAFTING DIGITAL EXPERIENCES',
  location: 'TOKYO, JP',
  available: true,

  about: {
    bio: `I'm a digital craftsman specializing in immersive web experiences, generative interfaces, and computational design. Currently exploring the intersection of WebGL, creative coding, and neural interfaces.`,
    focus: ['WebGL / Three.js', 'Creative Coding', 'Interactive Design', 'Performance Engineering'],
  },

  skills: [
    { name: 'JAVASCRIPT', level: 96, cat: 'frontend' },
    { name: 'TYPESCRIPT', level: 94, cat: 'frontend' },
    { name: 'THREE.JS', level: 92, cat: 'frontend' },
    { name: 'WEBGL', level: 88, cat: 'frontend' },
    { name: 'REACT', level: 95, cat: 'framework' },
    { name: 'VUE', level: 85, cat: 'framework' },
    { name: 'NODE.JS', level: 90, cat: 'backend' },
    { name: 'PYTHON', level: 82, cat: 'backend' },
    { name: 'WEBASSEMBLY', level: 75, cat: 'advanced' },
    { name: 'GLSL', level: 80, cat: 'advanced' },
    { name: 'RUST', level: 70, cat: 'advanced' },
    { name: 'POSTGRES', level: 85, cat: 'backend' },
  ],

  projects: [
    {
      title: 'GRID_PHANTOM',
      year: '2025',
      desc: 'Real-time collaborative 3D whiteboard with WebRTC and Three.js. Supports 50+ concurrent users with sub-16ms latency.',
      tags: ['THREE.JS', 'WEBRTC', 'WEBSOCKET'],
      color: 'cyan',
      link: '#',
      status: 'LIVE',
    },
    {
      title: 'NEURO_DASH',
      year: '2024',
      desc: 'AI-powered analytics platform with neural network visualizations. Processes 1M+ events/day with real-time anomaly detection.',
      tags: ['PYTHON', 'TENSORFLOW', 'D3.JS'],
      color: 'magenta',
      link: '#',
      status: 'LIVE',
    },
    {
      title: 'VOID_ENGINE',
      year: '2024',
      desc: 'Custom game engine written in Rust + WebAssembly. Achieves 120fps with complex particle systems and physics simulation.',
      tags: ['RUST', 'WASM', 'WGPU'],
      color: 'green',
      link: '#',
      status: 'BETA',
    },
    {
      title: 'GLITCH_LAB',
      year: '2023',
      desc: 'Generative art playground exploring algorithmic aesthetics. Featured in digital art exhibitions worldwide.',
      tags: ['CREATIVE_CODING', 'P5.JS', 'GLSL'],
      color: 'yellow',
      link: '#',
      status: 'ARCHIVED',
    },
  ],

  experience: [
    { role: 'LEAD ENGINEER', company: 'VOID_LABS', period: '2024-NOW', desc: 'Leading development of immersive web applications and creative tools.' },
    { role: 'SENIOR DEVELOPER', company: 'NEURAL_INC', period: '2022-2024', desc: 'Built real-time data visualization systems and AI-powered interfaces.' },
    { role: 'FULL STACK DEVELOPER', company: 'GRID_SYS', period: '2020-2022', desc: 'Developed distributed systems and interactive web platforms.' },
    { role: 'FRONTEND DEVELOPER', company: 'PIXEL_WORX', period: '2018-2020', desc: 'Created responsive web applications and UI component libraries.' },
  ],

  social: {
    github: 'github.com/ne0n',
    twitter: '@ne0n_dev',
    email: 'neon@voidlabs.io',
    discord: 'ne0n#0001',
  },

  stats: {
    years: '7+',
    projects: '50+',
    commits: '12K+',
    coffee: '∞',
  },
}