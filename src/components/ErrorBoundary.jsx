import { Component } from 'react'
import { profile } from '../data/profile.js'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Portfolio crashed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="crash-screen">
          <p className="crash-eyebrow">Algo salió mal</p>
          <h1>La página tuvo un error inesperado.</h1>
          <p>
            Prueba recargar. Si sigue pasando, escríbeme directamente a{' '}
            <a href={`mailto:${profile.links.email}`}>{profile.links.email}</a>.
          </p>
          <button type="button" onClick={() => window.location.reload()}>
            Recargar página
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
