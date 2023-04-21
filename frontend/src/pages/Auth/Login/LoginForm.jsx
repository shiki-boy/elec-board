import { useFormContext } from 'react-hook-form'

import './LoginForm.scss'

import Button from '@/components/Button'
import FormLabel from '@/components/Forms/Helpers/FormLabel'
import Password from '@/components/Password/Password'

const LoginForm = ( { goToSignUp, goToForgotPassword, isLoading } ) => {
  const { register, formState } = useFormContext()

  return (
    <div className='login-form'>
      <FormLabel name='email' field='Email Address' required>
        <input
          type='email'
          { ...register( 'email', { required: 'This field is required' } ) }
          placeholder='Email Address'
          className={ formState.errors?.email && 'error' }
        />
      </FormLabel>

      <Password />

      <Button
        title='Sign In'
        color='primary'
        type='submit'
        isLoading={ isLoading }
        loadingText='Signing in...'
      />

      <Button
        title='Create an account'
        color='tertiary'
        type='button'
        onClick={ goToSignUp }
      />
    </div>
  )
}

export default LoginForm
