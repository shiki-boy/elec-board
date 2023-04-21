import { useContext } from 'react'

import Form from '@/components/Forms/Form'
import AuthContext from '@/context/AuthContext'
import { loginURL } from '@/router/apiEndpoint'

import LoginForm from './LoginForm'

const Login = ( { goToSuccessPage, goToSignUp, goToForgotPassword } ) => {

  const { setUserData } = useContext( AuthContext )

  const onSuccess = ( responseData ) => {
    setUserData( responseData.user.info )
    goToSuccessPage()
  }

  return (
    <>
      <div className='content'>
        <h3 className='card-header'>Login</h3>

        <Form
          method='post'
          endpoint={ loginURL }
          onSuccess={ onSuccess }
          showOnlyToastErrors={ true }
          FormBody={ ( props ) =>
            LoginForm( {
              ...props,
              goToForgotPassword,
              goToSignUp,
            } )
          }
        />
      </div>
    </>
  )
}

export default Login
