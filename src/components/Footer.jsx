export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <p>
        © {year} riassd — hecho con React + Vite, publicado con GitHub Pages.
      </p>
    </footer>
  )
}
