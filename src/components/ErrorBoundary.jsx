import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="content">
          <h1 className="page-title">Something went wrong</h1>
          <p className="subtitle">Please refresh the page to try again.</p>
        </div>
      )
    }
    return this.props.children
  }
}
