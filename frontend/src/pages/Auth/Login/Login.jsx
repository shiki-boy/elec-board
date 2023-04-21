import { useContext } from 'react'

import Form from '@/components/Forms/Form'
import AuthContext from '@/context/AuthContext'
import { loginURL } from '@/router/apiEndpoint'

import LoginForm from './LoginForm'

const Login = ( { goToSuccessPage, goToSignUp } ) => {

  const { setUserData } = useContext( AuthContext )

  const onSuccess = ( responseData ) => {
    setUserData( { email: responseData.email } )
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
              goToSignUp,
            } )
          }
        />
      </div>
    </>
  )
}

export default Login
