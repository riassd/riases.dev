import Cursor from './components/Cursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Highlights from './components/Highlights.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
