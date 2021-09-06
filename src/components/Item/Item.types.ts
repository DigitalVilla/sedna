import * as React from 'react'

/**
 * Most common elements an html element may contain
 * @public
 */
export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  itemId: string
  title: string
  subtitle: string
  tags?: string[]
}
