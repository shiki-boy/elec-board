import { useState, useEffect } from 'react'
import classNames from 'classnames'

import './MenuButton.scss'

import Icon from '../Icon'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import { ArrowDownIcon } from '@/assets/icons'

const MenuButton = ( {
  title,
  IconComponent,
  dropdownContent,
  position = 'bottom',
  data,
  color = null, // primary | accent,
  isLoading,
} ) => {
  const [ showContent, setShowContent ] = useState( false )

  useEffect( () => {
    if ( isLoading ) {
      setShowContent( false )
    }
  }, [ isLoading ] )

  let Content

  if ( title ) {
    Content = <>{title}</>
  } else
    Content = <Icon IconComponent={ IconComponent } className='dark md' />

  const dropdownContainer = useOnClickOutside( () => setShowContent( false ) )

  const handleClick = ( e, func ) => {
    e.stopPropagation()
    func( data )
  }

  return (
    <div className='dropdown' ref={ dropdownContainer }>
      <button
        className={ classNames( {
          [color]: !!title,
          dropbtn: true,
          'with-title': !!title,
        } ) }
        onClick={ () => setShowContent( !showContent ) }
      >
        {Content}
        {!!title && (
          <Icon
            IconComponent={ ArrowDownIcon }
            className={ classNames( {
              'dark md down-arrow': true,
              rotate: showContent,
            } ) }
          />
        )}
      </button>
      {showContent && (
        <div
          className={ classNames( {
            'dropdown-content': true,
            'inherit-width': !!title,
            [position]: true,
          } ) }
          onClick={ () => {
            setShowContent( false )
          } }
        >
          {dropdownContent.map( ( { label, func, IconComponent, color } ) => (
            <div
              onClick={ ( e ) => handleClick( e, func ) }
              key={ label }
              className='content'
            >
              {!!Icon && (
                <Icon
                  className={ `${ color } md` }
                  IconComponent={ IconComponent }
                />
              )}
              <span>{label}</span>
            </div>
          ) )}
        </div>
      )}
    </div>
  )
}

export default MenuButton

/**
 * dropdownContent = [
 *  {
 *    label: ''
 *    func: () => {}
 *    IconComponent:
 *    color: primary | light | dark | danger
 *  }
 * ]
 */
