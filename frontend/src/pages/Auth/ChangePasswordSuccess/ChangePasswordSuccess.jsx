import './ChangePasswordSuccess.scss'

import Button from '@/components/Button'

const ChangePasswordSuccess = ( { goToLogin } ) => (
  <div className='form-container change-password-success'>
    <h3 className='card-header'>Password Changed</h3>

    <p className='text-center'>
      Your password has reset successfully login now with below link
    </p>

    <Button
      title='Login'
      color='primary'
      type='submit'
      isLoading={ false }
      onClick={ goToLogin }
    />
  </div>
)

export default ChangePasswordSuccess
