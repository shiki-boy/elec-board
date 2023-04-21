import { useFormContext } from 'react-hook-form'
import classNames from 'classnames'

import './SignupForm.scss'

import Button from '@/components/Button'
import FormLabel from '@/components/Forms/Helpers/FormLabel'

const SignupForm = ( { isLoading, goToLogin } ) => {
  const { register, formState } = useFormContext()

  return (
    <div className='signup-form'>
      <FormLabel name='first_name' field='First Name' required>
        <div className='input-field-container'>
          <input
            type='text'
            { ...register( 'first_name', { required: 'This field is required' } ) }
            placeholder='First Name'
            className={ classNames( 'full-width', formState.errors?.first_name && 'error' ) }
          />
        </div>
      </FormLabel>

      <FormLabel name='last_name' field='Last Name' required>
        <div className='input-field-container'>
          <input
            type='text'
            { ...register( 'last_name', { required: 'This field is required' } ) }
            placeholder='Last Name'
            className={ formState.errors?.last_name && 'error' }
          />
        </div>
      </FormLabel>

      <FormLabel name='email' field='Email Address' required>
        <div className='input-field-container'>
          <input
            type='email'
            { ...register( 'email', { required: 'This field is required' } ) }
            placeholder='Email Address'
            className={ formState.errors?.email && 'error' }
          />
        </div>
      </FormLabel>

      <Button
        title='Sign Up'
        color='primary'
        type='submit'
        isLoading={ isLoading }
      />

      <Button
        title='Go to login'
        color='tertiary login-btn'
        type='button'
        onClick={ goToLogin }
        style={ { margin: 0 } }
      />
    </div>
  )
}

export default SignupForm
