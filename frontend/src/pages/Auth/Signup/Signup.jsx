import { useContext } from 'react'

import Form from '@/components/Forms/Form'
import { signupURL } from '@/router/apiEndpoint'

import SignupForm from './SignupForm'
import UiContext from '@/context/UiContext'

const Signup = ( { goToLogin } ) => {
  const { setToast } = useContext( UiContext )

  const onSuccess = () => {
    setToast( {
      message:
        'Account created successfully! An email has been has sent to your account',
      type: 'success',
    } )
    goToLogin()
  }

  return (
    <div className='content signup'>
      <h3 className='card-header'>Signup</h3>

      {/* <p style={ subtextStyle }>
        After your free trial ends (if you don’t cancel it), you will be
        automatically billed $119 per month until canceled.
      </p> */}

      <Form
        method='post'
        endpoint={ signupURL }
        onSuccess={ onSuccess }
        FormBody={ ( props ) => <SignupForm { ...props } goToLogin={ goToLogin } /> }
      />
    </div>
  )
}

export default Signup
