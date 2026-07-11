import { motion } from 'framer-motion'
import Cursor from './components/Cursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TechMarquee from './components/TechMarquee.jsx'
import Highlights from './components/Highlights.jsx'
import Experience from './components/Experience.jsx'
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
      <Header />
      <main>
        <Hero />
        <TechMarquee />
        <Highlights />
        <Experience />
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
