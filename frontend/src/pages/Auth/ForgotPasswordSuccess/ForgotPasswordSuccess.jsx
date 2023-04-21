import './ForgotPasswordSuccess.scss'

import Button from '@/components/Button'

const ForgotPasswordSuccess = ( { goToLogin } ) => (
  <div className='form-container forgot-password-success'>
    <h3 className='card-header'>Forgot Password</h3>

    <p className='text-center'>Link sent succesfully please check your mailbox for reset your password.</p>

    <Button
      title='Go to login'
      color='tertiary login-btn'
      type='button'
      onClick={ goToLogin }
      style={ { margin: 0 } }
    />
  </div>
)

export default ForgotPasswordSuccess
