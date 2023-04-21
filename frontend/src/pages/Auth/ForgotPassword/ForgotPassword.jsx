import React, { useState, useEffect } from 'react'

import Button from '@/components/Button'
import FormLabel from '@/components/Forms/Helpers/FormLabel'
import useApi from '@/hooks/useApi'
import { forgotPasswordURL } from '@/router/apiEndpoint'

import './ForgotPassword.scss'

const ForgotPassword = ( { goToSuccessPage } ) => {
  const { mutate, isSuccess, isLoading } = useApi( 'post', forgotPasswordURL )

  const [ email, setEmail ] = useState( '' )

  useEffect( () => {
    if ( isSuccess ) {
      goToSuccessPage()
    }
  }, [ isSuccess ] )

  const handleSubmit = () => {
    if ( !email ) {
      return
    }

    mutate( { email } )
  }

  return (
    <div className='form-container'>
      <h3 className='card-header'>Forgot Password</h3>

      <p className='text-center'>
        Enter the email address you use for Tenkew and we’ll send you a password
        reset link.
      </p>

      <FormLabel name='email' field='Email Address' required>
        <input
          type='email'
          placeholder='Email Address'
          value={ email }
          onChange={ ( e ) => setEmail( e.target.value ) }
        />
      </FormLabel>

      <Button
        title='Submit'
        color='primary'
        type='submit'
        isLoading={ isLoading }
        onClick={ handleSubmit }
      />
    </div>
  )
}

export default ForgotPassword
