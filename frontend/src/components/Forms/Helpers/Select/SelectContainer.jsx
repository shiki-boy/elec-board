import { useRef, useState, forwardRef } from 'react'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

import './Select.scss'

import { ArrowDownIcon, CloseIcon } from '../../../../assets/icons'

import useOnClickOutside from '../../../../hooks/useOnClickOutside'
import FormLabel from '../FormLabel'
import Icon from '../../../Icon'

const SelectContainer = (
  {
    search,
    label,
    placeholder,
    handleSearch,
    options,
    setSearch,
    labelField = 'label',
    onSelect,
    isLoading = false,
    helperText,
    readOnly,
    name = 'select',
    keyField = 'value',
    onClear = () => {},
    isCreatable = false,
    handleCreate = () => {},
    hasError = false,
    required = false,
  },
  ref, // eslint-disable-line
) => {
  const noderef = useRef( null )

  const [ open, setOpen ] = useState( false )

  const clickOutside = useOnClickOutside( () => setOpen( false ) )

  const toggleOptions = () => {
    if ( readOnly ) return
    setOpen( ( old ) => !old )
  }

  const handleClick = ( opt ) => {
    setSearch( opt[labelField] )
    toggleOptions()
    onSelect( opt )
  }

  const clear = () => {
    setSearch( '' )
    onClear()
  }

  const handleIconClick = () => {
    if ( readOnly ) return
    if ( !search ) {
      setOpen( true )
    }
    clear()
  }

  return (
    <div className='select-container' ref={ clickOutside }>
      <FormLabel name={ name } field={ label } required={ required }>
        <div>
          <input
            type='text'
            onClick={ toggleOptions }
            className={ classNames( {
              error: hasError,
              'full-width': true,
            } ) }
            placeholder={ placeholder }
            value={ search ?? '' }
            onChange={ handleSearch }
            readOnly={ readOnly }
            autoComplete='nope'
          />

          <Icon
            className='right-inline-icon dark sm'
            IconComponent={ open || !!search ? CloseIcon : ArrowDownIcon }
            onClick={ handleIconClick }
          />

          {!!helperText && <span className='helper-text'>{helperText}</span>}
        </div>

        {isCreatable && (
          <p className='creatable-option' onClick={ handleCreate }>
            Not Found? Add a {label}
          </p>
        )}
      </FormLabel>

      <CSSTransition
        appear
        classNames='slide-down'
        in={ open }
        mountOnEnter
        unmountOnExit
        nodeRef={ noderef }
        timeout={ 0 }
      >
        <div className='options' ref={ noderef }>
          {isLoading && <p className='loading'>Fetching options...</p>}

          {0 === options.length && <p>No options</p>}

          {options.map( ( opt, index ) => (
            <p
              key={ `${ opt[keyField] }_${ index }` }
              onClick={ () => handleClick( opt ) }
            >
              {opt[labelField]}
            </p>
          ) )}
        </div>
      </CSSTransition>
    </div>
  )
}

export default forwardRef( SelectContainer )
