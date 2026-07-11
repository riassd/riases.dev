import { motion } from 'framer-motion'
import Cursor from './components/Cursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import EasterEgg from './components/EasterEgg.jsx'
import BackToTop from './components/BackToTop.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TechMarquee from './components/TechMarquee.jsx'
import Highlights from './components/Highlights.jsx'
import Experience from './components/Experience.jsx'
import StatsStrip from './components/StatsStrip.jsx'
import Certifications from './components/Certifications.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { useSmoothScroll } from './hooks/useSmoothScroll.js'
import './App.css'

function App() {
  useSmoothScroll()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <Cursor />
      <ScrollProgress />
      <CommandPalette />
      <EasterEgg />
      <BackToTop />
      <Header />
      <main>
        <Hero />
        <TechMarquee />
        <Highlights />
        <Experience />
        <StatsStrip />
        <Certifications />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  )
}

export default App
