import classNames from 'classnames'

import Icon from '@/components/Icon'

const Button = ( {
  title,
  isLoading,
  loadingText = 'Loading...',
  color, // primary | secondary | danger | special | special dark
  disabled,
  IconComponent,
  iconClassName = 'primary md',
  fullWidth = false,
  ...rest
} ) => (
  <button
    className={ classNames( {
      [color]: true,
      'full-width': fullWidth,
      'icon-btn': !title,
      loading: isLoading,
    } ) }
    disabled={ disabled || isLoading }
    { ...rest }
  >
    {IconComponent && (
      <Icon IconComponent={ IconComponent } className={ iconClassName }/>
    )}
    {isLoading ? loadingText : title}
  </button>
)

export default Button
