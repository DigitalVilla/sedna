/**
 * An object of string keys with value any, value with falsy values will be omitted
 *
 * @public
 */
export type cssProp = {
  [key: string]: string | undefined | null | boolean | number
}

/**
 * Get only truthy CSS Properties from JS props.<br/>
 * The JS prop name must match the css variable name unless a kebab flag is used.<br/>
 * The `KEY` is modified into a valid css parameter `--param`.<br/>
 * If `isVar` is false the `VALUE` is passed as is.<br/>
 * Else the `VALUE` is passed as a CSS variable `var(--value)`.
 *
 * @param styles - object of cssProp types
 * @param isVar - transforms the `value` into a css variable
 * @param kebab - changes a `KEY` into a valid `kebab-case` key
 * @returns truthy JS props into a valid CSSProperties object
 *
 * @example
 * `Get param keys as valid css parameters`
 * ```
 * css({'justifyContent': 'center'})
 *
 * // returns -> {'--justifyContent': 'center'}
 * ```
 * @example
 * `Get param value as a valid css variable`
 * ```
 * css({'justifyContent': 'custom'}, true)
 *
 * // returns -> {'--justifyContent': 'var(--custom)'}
 * ```
 * @example
 * `Get param keys as valid kebab case parameters`
 * ```
 * css({'justifyContent': 'center'},false,true)
 *
 * // returns -> {'--justify-content': 'center'}
 * ```
 * @public
 */
export function css(
  styles: cssProp,
  isVar?: boolean,
  kebab?: boolean
): Record<string, string> {
  const params: Record<string, string> = {}
  Object.keys(styles).forEach((el) => {
    const key = kebab
      ? `--${el.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase())}`
      : `--${el}`
    if (styles[el])
      params[key] = `${isVar ? 'var(--' : ''}${styles[el]}${isVar ? ')' : ''}`
  })

  return params
}

/**
 * Allows any type of value but falsy values will be ignored
 *
 * @public
 */
export type classParam =
  | string
  | boolean
  | null
  | number
  | undefined
  | null
  | void

/**
 * Processes elements of any type filtering out falsy values and 'undefined' strings
 * @returns the filtered classList as a space separated string
 *
 * @example
 * `Gat a className string of truthy values`
 * ```
 * cls([true, undefined, 'main', 'invalid', false && 'active', console.log('test')])
 *
 * // returns -> `true main invalid`
 * ```
 * @public
 */
export function cls(classList: classParam[]): string {
  return classList.filter((c) => c && c !== 'undefined').join(' ')
}
