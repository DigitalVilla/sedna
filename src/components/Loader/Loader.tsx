import { cls, css } from '../../utils/utils'
import { LoaderProps } from './Loader.types'
import './Loader.scss'

export const Loader = ({
  theme,
  background,
  loading = true,
  gradient = true,
  ...rest
}: LoaderProps): JSX.Element => {
  return (
    <div
      className={cls([
        'quantum-loader-page',
        gradient && 'gradient',
        loading ? 'active' : 'hidden',
      ])}
      style={{ ...css({ theme }, true), ...css({ background }) }}
      aria-label="loading..."
      aria-hidden={!loading}
      {...rest}
    >
      {loading && (
        <div className="quantum-loader-wrapper">
          <div className="loader">Loading...</div>
        </div>
      )}
    </div>
  )
}

export default Loader
