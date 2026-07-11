import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Cursor from './components/Cursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import BackToTop from './components/BackToTop.jsx'
import InstallPrompt from './components/InstallPrompt.jsx'
import Dock from './components/Dock.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TechMarquee from './components/TechMarquee.jsx'
import Highlights from './components/Highlights.jsx'
import Experience from './components/Experience.jsx'
import StatsStrip from './components/StatsStrip.jsx'
import GitHubPulse from './components/GitHubPulse.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { useSmoothScroll } from './hooks/useSmoothScroll.js'
import './App.css'

// Not needed for first paint: split into their own chunks so the
// critical path (hero + content) doesn't wait on cmdk/radix-ui or
// canvas-confetti.
const CommandPalette = lazy(() => import('./components/CommandPalette.jsx'))
const EasterEgg = lazy(() => import('./components/EasterEgg.jsx'))
const Certifications = lazy(() => import('./components/Certifications.jsx'))
const Terminal = lazy(() => import('./components/Terminal.jsx'))

function App() {
  useSmoothScroll()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>
      <Cursor />
      <ScrollProgress />
      <Suspense fallback={null}>
        <CommandPalette />
        <EasterEgg />
        <Terminal />
      </Suspense>
      <BackToTop />
      <InstallPrompt />
      <Dock />
      <Header />
      <main id="main-content">
        <Hero />
        <TechMarquee />
        <Highlights />
        <Experience />
        <StatsStrip />
        <GitHubPulse />
        <Suspense fallback={<div className="section" />}>
          <Certifications />
        </Suspense>
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  )
}

export default App
