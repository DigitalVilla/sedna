import * as React from 'react'
import { theme } from '../../utils/types'

/**
 * Most common elements an html element may contain
 * @public
 */
export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: theme
  loading?: boolean
  gradient?: boolean
  background?: string
}
