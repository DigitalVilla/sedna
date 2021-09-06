import * as React from 'react'
import { theme, radius, width } from '../../utils/types'

/**
 * Most common elements an html element may contain
 * @public
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: theme
  radius?: radius
  width?: width
  label: string
  fill?: boolean
}
