import * as React from 'react'
import { ButtonProps } from './Button.types'
import { cls, css } from '../../utils/utils'
import './Button.scss'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      theme = 'primary',
      className = '',
      width = 'none',
      radius = '4',
      fill = false,
      label,
      children,
      ...rest
    },
    ref
  ): JSX.Element => {
    return (
      <button
        {...rest}
        type={type}
        ref={ref}
        aria-label={label}
        className={cls([
          className,
          'app-btn',
          `width-${width}`,
          `radius-${radius}`,
          fill && 'fill',
        ])}
        style={css({ theme }, true)}
      >
        {children || label}
      </button>
    )
  }
)

export default Button
