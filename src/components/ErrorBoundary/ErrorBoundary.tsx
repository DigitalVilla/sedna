import React from 'react'
import { Icon } from '../Icon'
import { IconTypes } from '../Icon/Icon.types'
import { EBProps, EBState } from './ErrorBoundary.types'
import './ErrorBoundary.scss'

export class ErrorBoundary extends React.Component<EBProps, EBState> {
  constructor(props: EBProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): EBState {
    console.log('ErrorBoundary: ', error)
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Error reporting service
    this.props.onError && this.props.onError({ error, errorInfo })
  }

  render(): React.ReactNode {
    const { hasError } = this.state
    const { children, subtitle, title, icon, buttonLabel, onClick } = this.props

    const handleClick = () => {
      onClick()
    }

    if (!hasError) return children
    return (
      <section className="error-boundary">
        <div className="card">
          <div className="title">
            <Icon i={(icon as IconTypes) || 'info'} theme="secondary" />
            {title && <h2>Sorry, something went wrong!</h2>}
          </div>
          {subtitle && <p>Our team has been notified of this issue.</p>}
          {buttonLabel && (
            <button
              className="btn width-lg radius-4 fill"
              onClick={handleClick}
              type="button"
            >
              {buttonLabel}
            </button>
          )}
        </div>
      </section>
    )
  }
}

export default ErrorBoundary
