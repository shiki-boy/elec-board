import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import Button from '@/components/Button'
import FormLabel from '@/components/Forms/Helpers/FormLabel'
import useApi from '@/hooks/useApi'
import { resetPasswordURL } from '@/router/apiEndpoint'
import UiContext from '@/context/UiContext'

// TODO: make this into a <Form />
const ChangePassword = ( { goToSuccessPage } ) => {
  const { uid, token } = useParams()

  const { setToast } = useContext( UiContext )

  const { mutate, isLoading, isSuccess, isError, error } = useApi(
    'post',
    resetPasswordURL,
  )

  const [ password1, setPassword1 ] = useState( '' )
  const [ password2, setPassword2 ] = useState( '' )

  useEffect( () => {
    if ( isSuccess ) {
      goToSuccessPage()
    }
  }, [ isSuccess ] )

  useEffect( () => {
    if ( isError ) {
      if ( 400 === error.status && error.data?.new_password2 ) {
        setToast( {
          message: error.data.new_password2[0],
          type: 'error',
        } )
      }
    }
  }, [ isError ] )

  const handleSubmit = () => {
    mutate( {
      new_password1: password1,
      new_password2: password2,
      token,
      uid,
    } )
  }

  return (
    <div className='form-container'>
      <h3 className='card-header'>Set New Password</h3>

      <FormLabel name='password1' field='New Password' required>
        <input
          type='password'
          placeholder='New Password'
          value={ password1 }
          onChange={ ( e ) => setPassword1( e.target.value ) }
        />
      </FormLabel>

      <FormLabel name='password2' field='Confirm Password' required>
        <input
          type='password'
          placeholder='Confirm Password'
          value={ password2 }
          onChange={ ( e ) => setPassword2( e.target.value ) }
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

export default ChangePassword
