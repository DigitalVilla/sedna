import * as React from 'react'
import { InputProps } from './Input.types'
import { cls } from '../../utils/utils'
import './Input.scss'

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = `${Date.now()}`,
      children,
      name = '',
      label = '',
      value = '',
      hideLabel = false,
      disabled = false,
      readOnly = false,
      hasError = false,
      errorMessage = '',
      infoMessage = '',
      width = 'none',
      type = 'text',
      max = 1e2,
      onFastChange = null,
      onChange = null,
      ...rest
    },
    ref
  ): JSX.Element => {
    const [val, setVal] = React.useState(value)

    React.useEffect(() => {
      setVal(value)
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length > max) return
      const { name, value } = e.target

      if (onFastChange) {
        const newVal = onFastChange({ name, value })
        newVal !== undefined && setVal(newVal)
        return
      }
      if (onChange) onChange(e)
    }

    return (
      <div className={cls(['app-input', `width-${width}`, className])}>
        <label
          className={cls(['app-label', hideLabel && 'hidden'])}
          htmlFor={`app-input-field-${name}-${className}`}
        >
          {label}
        </label>
        <div className={cls(['app-input-container', readOnly && 'readOnly'])}>
          <input
            id={`app-input-field-${name}-${className}`}
            className={cls([
              `app-input-field`,
              'app-controller',
              hasError && 'hasError',
              disabled && 'disabled',
            ])}
            readOnly={readOnly}
            disabled={disabled}
            name={name}
            onChange={handleChange}
            type={type}
            value={!disabled ? val : ''}
            ref={ref}
            {...rest}
          />
          {children}
        </div>
        {!disabled && !readOnly && hasError && errorMessage && (
          <div className={`app-info-log ellipsis color-danger`}>
            {errorMessage}
          </div>
        )}
        {!disabled && !hasError && infoMessage && (
          <div className={`app-info-log ellipsis color-gray`}>
            {infoMessage}
          </div>
        )}
      </div>
    )
  }
)

export default Input
