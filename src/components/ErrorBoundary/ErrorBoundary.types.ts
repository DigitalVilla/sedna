import * as React from 'react'

/**
 * Most common elements an html element may contain
 * @public
 */
export interface EBProps {
  children: React.ReactNode
  buttonLabel: string
  onClick: () => void
  onError?: (error: Record<string, Error | React.ErrorInfo | string>) => void
  subtitle?: string
  title?: string
  icon?: string
  path?: string
}

export interface EBState {
  hasError: boolean
  errorInfo?: React.ErrorInfo | null
  error?: Error | null
}
