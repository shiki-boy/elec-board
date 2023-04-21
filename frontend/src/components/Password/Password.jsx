import React, { forwardRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import classNames from 'classnames'

import './Password.scss'

import Icon from '@/components/Icon'
import {
  ShowIcon as ShowPasswordIcon,
  HideIcon as HidePasswordIcon,
  LockIcon,
} from '@/assets/icons'
import FormLabel from '@/components/Forms/Helpers/FormLabel'

const Password = (
  { placeholder, field = 'Password', name = 'password', isRequired = true, noLabel = false },
  ref,
) => {
  const { register, formState } = useFormContext()

  const [ showPassword, setShowPassword ] = useState( false )

  const toggle = () => {
    setShowPassword( !showPassword )
  }

  return (
    <FormLabel name={ name } field={ field } required={ isRequired } noLabel={ noLabel }>
      <div className='password-field-container'>
        <input
          className={ classNames( {
            error: formState?.errors[name],
            'full-width': true,
          } ) }
          type={ showPassword ? 'text' : 'password' }
          { ...register( name, { required: isRequired && 'This field is required' } ) }
          placeholder={ placeholder ?? field }
        />
        {!showPassword ? (
          <Icon
            className='right-inline-icon md primary'
            IconComponent={ LockIcon }
            onClick={ toggle }
          />
        ) : (
          <Icon
            className='right-inline-icon md dark'
            IconComponent={ LockIcon }
            onClick={ toggle }
          />
        )}
      </div>
    </FormLabel>
  )
}

export default forwardRef( Password )
