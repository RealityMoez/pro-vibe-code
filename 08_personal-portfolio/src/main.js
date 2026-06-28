import './style.css'
import { portfolio } from './data.js'

const qs = s => document.querySelector(s)
const qsa = s => [...document.querySelectorAll(s)]

const html = String.raw

class ParticleCanvas {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.particles = []
    this.mouse = { x: -1000, y: -1000 }
    this.colors = ['#00f0ff', '#ff00aa', '#00ff41']
    this.resize()
    this.init()
    this.bind()
    this.animate()
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  init() {
    const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 20000))
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        alpha: Math.random() * 0.5 + 0.1,
        connections: [],
      })
    }
  }

  bind() {
    window.addEventListener('resize', () => { this.resize(); this.particles = []; this.init() })
    window.addEventListener('mousemove', e => { this.mouse.x = e.clientX; this.mouse.y = e.clientY })
    window.addEventListener('mouseleave', () => { this.mouse.x = -1000; this.mouse.y = -1000 })
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (const p of this.particles) {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1

      const dx = this.mouse.x - p.x
      const dy = this.mouse.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 150) {
        p.x -= dx * 0.02
        p.y -= dy * 0.02
      }

      p.connections = []
      for (const other of this.particles) {
        if (other === p) continue
        const ox = other.x - p.x
        const oy = other.y - p.y
        const d = Math.sqrt(ox * ox + oy * oy)
        if (d < 120) {
          const lineAlpha = (1 - d / 120) * 0.15
          this.ctx.beginPath()
          this.ctx.strokeStyle = p.color + Math.floor(lineAlpha * 255).toString(16).padStart(2, '0')
          this.ctx.lineWidth = 0.5
          this.ctx.moveTo(p.x, p.y)
          this.ctx.lineTo(other.x, other.y)
          this.ctx.stroke()
        }
      }

      this.ctx.beginPath()
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      this.ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0')
      this.ctx.fill()
    }
  }

  animate() {
    this.draw()
    requestAnimationFrame(() => this.animate())
  }
}

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.frame = null
  }
  setText(newText) {
    const oldText = this.el.textContent
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise(resolve => {
      let i = 0
      const animate = () => {
        this.el.textContent = newText.slice(0, Math.floor(i)) + oldText.slice(Math.floor(i))
        i += 0.5
        if (i <= length) {
          this.frame = requestAnimationFrame(animate)
        } else {
          this.el.textContent = newText
          resolve()
        }
      }
      animate()
    })
    return promise
  }
}

class CustomCursor {
  constructor() {
    this.main = document.getElementById('cursor-main')
    this.trail = document.getElementById('cursor-trail')
    this.trailPos = { x: 0, y: 0 }
    this.mainPos = { x: 0, y: 0 }
    this.hovering = false
    this.bind()
  }
  bind() {
    document.addEventListener('mousemove', e => {
      this.mainPos.x = e.clientX
      this.mainPos.y = e.clientY
    })
    document.addEventListener('mousedown', () => this.main.classList.add('clicking'))
    document.addEventListener('mouseup', () => this.main.classList.remove('clicking'))
    document.addEventListener('mouseenter', () => { this.main.style.opacity = '1'; this.trail.style.opacity = '0.6' })
    document.addEventListener('mouseleave', () => { this.main.style.opacity = '0'; this.trail.style.opacity = '0' })
    qsa('a, button, .tilt-card, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => this.main.classList.add('hover'))
      el.addEventListener('mouseleave', () => this.main.classList.remove('hover'))
    })
  }
  update() {
    this.trailPos.x += (this.mainPos.x - this.trailPos.x) * 0.15
    this.trailPos.y += (this.mainPos.y - this.trailPos.y) * 0.15
    if (this.main) {
      this.main.style.left = this.mainPos.x + 'px'
      this.main.style.top = this.mainPos.y + 'px'
    }
    if (this.trail) {
      this.trail.style.left = this.trailPos.x + 'px'
      this.trail.style.top = this.trailPos.y + 'px'
    }
    requestAnimationFrame(() => this.update())
  }
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        if (e.target.dataset.skill) {
          const bar = e.target.querySelector('.skill-bar-fill')
          if (bar) bar.style.width = e.target.dataset.skill + '%'
        }
        observer.unobserve(e.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
  qsa('.reveal, .reveal-left, .reveal-scale').forEach(el => observer.observe(el))
}

function initTilt() {
  qsa('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const w = rect.width, h = rect.height
      const ry = ((x / w) - 0.5) * 12
      const rx = ((y / h) - 0.5) * -12
      card.style.setProperty('--rx', `${rx}deg`)
      card.style.setProperty('--ry', `${ry}deg`)
    })
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg')
      card.style.setProperty('--ry', '0deg')
    })
  })
}

function initNav() {
  const links = qsa('.nav-link')
  const sections = qsa('section[id]')
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('text-neon-cyan'))
        links.forEach(l => l.classList.add('text-gray-500'))
        const active = qs(`.nav-link[href="#${e.target.id}"]`)
        if (active) {
          active.classList.add('text-neon-cyan')
          active.classList.remove('text-gray-500')
        }
      }
    })
  }, { threshold: 0.4 })
  sections.forEach(s => observer.observe(s))
}

function initTypewriter() {
  const el = qs('.typing-cursor')
  if (!el) return
  const text = el.textContent
  el.textContent = ''
  let i = 0
  const interval = setInterval(() => {
    el.textContent += text[i]
    i++
    if (i >= text.length) clearInterval(interval)
  }, 50)
}

function render() {
  const app = qs('#app')
  app.innerHTML = html`
    <canvas id="particles-canvas"></canvas>
    <div class="noise"></div>
    <div class="scanlines"></div>
    <div id="cursor-main"></div>
    <div id="cursor-trail"></div>

    <nav class="fixed top-0 left-0 right-0 z-50 border-b border-dark-4 bg-dark-1/80 backdrop-blur-sm">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" class="text-lg font-black tracking-widest text-neon-cyan hover:text-glow-cyan transition-all glitch" data-text="NE0N//">NE0N//</a>
        <div class="flex gap-8 text-[10px] tracking-[0.25em]">
          ${['ABOUT', 'WORK', 'STACK', 'TIMELINE', 'CONTACT'].map(s => html`
            <a href="#${s.toLowerCase()}" class="nav-link text-gray-500 hover:text-neon-cyan transition-colors duration-300 py-2">${s}</a>
          `).join('')}
        </div>
      </div>
    </nav>

    <main class="content-layer">
      <section id="hero" class="min-h-screen flex items-center justify-center relative">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-dark-1/50 to-dark-1 pointer-events-none"></div>
        <div class="relative z-10 text-center px-6 max-w-4xl">
          <div class="reveal mb-8">
            <span class="inline-block px-3 py-1 border border-neon-cyan/30 text-neon-cyan text-[10px] tracking-[0.3em]">SYSTEM ONLINE</span>
          </div>
          <h1 class="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-2 reveal" style="transition-delay:0.1s">
            <span class="glitch block text-glow-cyan" data-text="${portfolio.name}">${portfolio.name}</span>
            <span class="text-3xl md:text-5xl lg:text-6xl text-gray-600 tracking-[0.3em]">${portfolio.title}</span>
          </h1>
          <div class="text-neon-magenta text-sm md:text-base tracking-[0.3em] my-6 reveal" style="transition-delay:0.2s">
            <span class="typing-cursor">${portfolio.tagline}</span>
          </div>
          <div class="text-gray-600 text-xs tracking-[0.2em] mb-12 reveal" style="transition-delay:0.3s">
            ${portfolio.subtitle}
          </div>
          <div class="flex gap-4 justify-center reveal" style="transition-delay:0.4s">
            <a href="#work" class="btn-primary">VIEW_PROJECTS</a>
            <a href="#contact" class="btn-secondary">GET_IN_TOUCH</a>
          </div>
          <div class="mt-20 flex justify-center gap-12 text-[10px] tracking-[0.3em] text-gray-700 reveal" style="transition-delay:0.5s">
            ${Object.entries(portfolio.stats).map(([k, v]) => html`
              <div>
                <div class="text-2xl font-black text-neon-cyan">${v}</div>
                <div class="text-gray-600 mt-1">${k.toUpperCase()}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <a href="#about" class="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600 hover:text-neon-cyan transition-colors">
          <svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
        </a>
      </section>

      <section id="about" class="py-32 px-6 border-t border-dark-4">
        <div class="max-w-5xl mx-auto">
          <div class="section-label reveal">// ABOUT_ME</div>
          <h2 class="section-title text-neon-magenta reveal" style="transition-delay:0.1s">SYSTEM<span class="text-gray-600">_</span>PROFILE</h2>
          <div class="grid lg:grid-cols-5 gap-8 mt-12">
            <div class="lg:col-span-3 reveal-left" style="transition-delay:0.2s">
              <div class="border border-dark-4 bg-dark-2 p-8 relative corner-br">
                <div class="terminal-line text-sm text-gray-400 leading-relaxed">${portfolio.about.bio}</div>
              </div>
              <div class="grid grid-cols-2 gap-4 mt-6">
                ${portfolio.about.focus.map((f, i) => html`
                  <div class="flex items-center gap-3 text-sm reveal" style="transition-delay:${0.3 + i * 0.08}s">
                    <span class="w-1.5 h-1.5 bg-neon-cyan"></span>
                    <span class="text-gray-400">${f}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="lg:col-span-2 reveal" style="transition-delay:0.3s">
              <div class="border border-dark-4 bg-dark-2 p-8">
                <div class="text-[10px] tracking-[0.3em] text-gray-600 mb-6">// LOCATION</div>
                <div class="text-xl text-neon-cyan font-bold">${portfolio.location}</div>
                <div class="mt-8">
                  <div class="text-[10px] tracking-[0.3em] text-gray-600 mb-3">// STATUS</div>
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 bg-neon-green animate-pulse"></span>
                    <span class="text-neon-green text-sm">${portfolio.available ? 'AVAILABLE_FOR_WORK' : 'NOT_AVAILABLE'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" class="py-32 px-6 border-t border-dark-4 bg-dark-1/50">
        <div class="max-w-5xl mx-auto">
          <div class="section-label reveal">// SELECTED</div>
          <h2 class="section-title text-neon-cyan reveal" style="transition-delay:0.1s">PROJECT<span class="text-gray-600">_</span>SHOWCASE</h2>
          <div class="grid md:grid-cols-2 gap-6 mt-16">
            ${portfolio.projects.map((p, i) => html`
              <a href="${p.link}" class="project-card group block border border-dark-4 bg-dark-2 p-8 tilt-card corner-br reveal" data-color="${p.color}" style="transition-delay:${0.2 + i * 0.1}s">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <div class="text-xs text-gray-600 mb-1">${p.year}</div>
                    <h3 class="text-xl font-bold text-neon-${p.color} group-hover:text-glow-${p.color} transition-all">${p.title}</h3>
                  </div>
                  <span class="text-[9px] tracking-[0.2em] px-2 py-1 border border-dark-4 text-gray-600">${p.status}</span>
                </div>
                <p class="text-gray-500 text-sm leading-relaxed mb-6">${p.desc}</p>
                <div class="flex flex-wrap gap-2">
                  ${p.tags.map(t => html`
                    <span class="text-[9px] tracking-wider px-2 py-1 border border-dark-4 text-gray-600 bg-dark-1">${t}</span>
                  `).join('')}
                </div>
                <div class="mt-6 h-px bg-dark-4 group-hover:bg-neon-${p.color} transition-colors duration-500"></div>
              </a>
            `).join('')}
          </div>
        </div>
      </section>

      <section id="stack" class="py-32 px-6 border-t border-dark-4">
        <div class="max-w-5xl mx-auto">
          <div class="section-label reveal">// CAPABILITIES</div>
          <h2 class="section-title text-neon-green reveal" style="transition-delay:0.1s">TECH<span class="text-gray-600">_</span>STACK</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
            ${portfolio.skills.map((s, i) => html`
              <div class="skill-item border border-dark-4 bg-dark-2 p-5 reveal corner-br" data-skill="${s.level}" style="transition-delay:${0.15 + i * 0.06}s">
                <div class="flex justify-between items-center mb-3">
                  <span class="text-sm font-bold tracking-wider text-gray-300">${s.name}</span>
                  <span class="text-[10px] text-neon-${['cyan', 'magenta', 'green', 'yellow'][i % 4]}">${s.level}%</span>
                </div>
                <div class="h-1 bg-dark-4 overflow-hidden">
                  <div class="skill-bar-fill h-full bg-neon-${['cyan', 'magenta', 'green', 'yellow'][i % 4]}" style="width:0%"></div>
                </div>
                <div class="text-[9px] text-gray-700 mt-2 tracking-wider uppercase">${s.cat}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section id="timeline" class="py-32 px-6 border-t border-dark-4 bg-dark-1/50">
        <div class="max-w-4xl mx-auto">
          <div class="section-label reveal">// HISTORY</div>
          <h2 class="section-title text-neon-yellow reveal" style="transition-delay:0.1s">TIMELINE<span class="text-gray-600">_</span>ARCHIVE</h2>
          <div class="mt-16">
            ${portfolio.experience.map((e, i) => html`
              <div class="timeline-item reveal" style="transition-delay:${0.2 + i * 0.12}s">
                <div class="text-[10px] tracking-[0.3em] text-neon-cyan mb-2">${e.period}</div>
                <div class="text-xl font-bold text-white mb-1">${e.role}</div>
                <div class="text-sm text-neon-magenta tracking-wider mb-3">// ${e.company}</div>
                <p class="text-gray-500 text-sm">${e.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section id="contact" class="py-32 px-6 border-t border-dark-4">
        <div class="max-w-3xl mx-auto text-center">
          <div class="section-label reveal">// COMMUNICATE</div>
          <h2 class="section-title text-neon-cyan reveal" style="transition-delay:0.1s">ESTABLISH<span class="text-gray-600">_</span>LINK</h2>
          <p class="text-gray-500 mt-6 mb-12 reveal" style="transition-delay:0.2s">
            Open to freelance projects, collaborations, and interesting conversations.
          </p>
          <div class="grid sm:grid-cols-2 gap-4 mb-12">
            <a href="mailto:${portfolio.social.email}" class="border border-dark-4 bg-dark-2 p-6 text-left hover:box-glow-cyan transition-all reveal group" style="transition-delay:0.3s">
              <div class="text-[10px] tracking-[0.2em] text-gray-600 mb-2">// EMAIL</div>
              <div class="text-sm text-gray-300 group-hover:text-neon-cyan transition-colors">${portfolio.social.email}</div>
            </a>
            <a href="#" class="border border-dark-4 bg-dark-2 p-6 text-left hover:box-glow-magenta transition-all reveal group" style="transition-delay:0.35s">
              <div class="text-[10px] tracking-[0.2em] text-gray-600 mb-2">// GITHUB</div>
              <div class="text-sm text-gray-300 group-hover:text-neon-magenta transition-colors">${portfolio.social.github}</div>
            </a>
            <a href="#" class="border border-dark-4 bg-dark-2 p-6 text-left hover:box-glow-cyan transition-all reveal group" style="transition-delay:0.4s">
              <div class="text-[10px] tracking-[0.2em] text-gray-600 mb-2">// TWITTER</div>
              <div class="text-sm text-gray-300 group-hover:text-neon-cyan transition-colors">${portfolio.social.twitter}</div>
            </a>
            <div class="border border-dark-4 bg-dark-2 p-6 text-left reveal" style="transition-delay:0.45s">
              <div class="text-[10px] tracking-[0.2em] text-gray-600 mb-2">// DISCORD</div>
              <div class="text-sm text-gray-300">${portfolio.social.discord}</div>
            </div>
          </div>
          <div class="reveal" style="transition-delay:0.5s">
            <div class="text-[10px] text-gray-700 tracking-[0.2em]">
              <span class="text-neon-green">// ENCRYPTED</span> // SECURE_CHANNEL // ${new Date().getFullYear()}
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-dark-4 py-8 px-6">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.2em] text-gray-700">
        <div>NE0N_ARCHITECT // ALL_SYSTEMS_RESERVED</div>
        <div class="flex gap-6">
          <a href="#" class="hover:text-neon-cyan transition-colors">GITHUB</a>
          <a href="#" class="hover:text-neon-magenta transition-colors">TWITTER</a>
          <a href="#" class="hover:text-neon-green transition-colors">DISCORD</a>
        </div>
      </div>
    </footer>
  `

  new ParticleCanvas(qs('#particles-canvas'))
  new CustomCursor().update()
  initReveal()
  initTilt()
  initNav()
  initTypewriter()

  qsa('.skill-item').forEach(item => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const bar = e.target.querySelector('.skill-bar-fill')
          if (bar) bar.style.width = e.target.dataset.skill + '%'
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.3 })
    observer.observe(item)
  })
}

document.addEventListener('DOMContentLoaded', render)