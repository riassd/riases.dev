export default function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" data-cursor="hover">
        riassd<span className="brand-dot">.</span>
      </a>
      <nav className="nav">
        <a href="#experiencia" data-cursor="hover">
          Experiencia
        </a>
        <a href="#proyectos" data-cursor="hover">
          Proyectos
        </a>
        <a href="#skills" data-cursor="hover">
          Skills
        </a>
        <a href="#contacto" data-cursor="hover">
          Contacto
        </a>
      </nav>
    </header>
  )
}
