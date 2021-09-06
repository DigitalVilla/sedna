import * as React from 'react'
import { width } from '../../utils/types'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  hideLabel?: boolean
  hasError?: boolean
  readOnly?: boolean
  errorMessage?: string
  infoMessage?: string
  width?: width
  /**
   * Limit the string input to a max length
   */
  max?: number
  /**
   * Keep a fast state within the input, function must return the next state string
   */
  onFastChange?: FastChangeFn
}

export type FastChangeFn = (props: ChangeFnProps) => string | undefined

export type ChangeFnProps = {
  name: string
  value: string
}
