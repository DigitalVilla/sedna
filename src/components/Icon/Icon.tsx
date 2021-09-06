import { IconProps } from './Icon.types'
import { cls, css } from '../../utils/utils'
import { Icons, IconType } from './iconList'
import './Icon.scss'

export const Icon = ({
  i,
  className,
  theme,
  ...rest
}: IconProps): JSX.Element => {
  const I: IconType = Icons[i]
  return !I ? (
    <h1 className="color-danger">{i}</h1>
  ) : (
    <svg
      className={cls(['app-icon', className])}
      xmlns="http://www.w3.org/2000/svg"
      style={css({ theme }, true)}
      aria-label={`${i} icon`}
      role="graphics-document"
      viewBox={I.viewBox}
      fill="none"
      {...rest}
    >
      {I.path.map((p: string, i: number) => {
        return <path key={`${p.substr(0, 10)}-${i}`} d={p}></path>
      })}
    </svg>
  )
}

export default Icon
