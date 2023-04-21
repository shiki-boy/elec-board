import classNames from 'classnames'

import './Avatar.scss'

import { UserIcon } from '@/assets/icons'

import Icon from '@/components/Icon'

const Avatar = ( { url } ) => (
  <div
    className={ classNames( {
      'avatar-container': true,
      'no-img': !url,
    } ) }
  >
    {url ? (
      <img
        className={ classNames( { 'avatar-img': true } ) }
        src={ url }
        alt='user'
      />
    ) : (
      <Icon IconComponent={ UserIcon } className='light md' />
    )}
  </div>
)

export default Avatar
