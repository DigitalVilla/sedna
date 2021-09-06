import * as React from 'react'
import { theme } from '../../utils/types'

export interface IconType {
  viewBox: string
  path: string[]
}

/**
 * Most common elements an html element may contain
 * @public
 */
export interface IconProps extends React.HTMLAttributes<SVGSVGElement> {
  /** Optional color theme*/
  theme?: theme
  /** Icon name */
  i: IconTypes
}

export type IconTypes = 'search' | 'close'
