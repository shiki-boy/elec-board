import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { camelCase, kebabCase, upperFirst } from 'lodash'

import Login from './Login'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'
import ForgotPasswordSuccess from './ForgotPasswordSuccess'
import ChangePassword from './ChangePassword'
import ChangePasswordSuccess from './ChangePasswordSuccess'

const Auth = ( { defaultPage } ) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [ currentPage, setCurrentPage ] = useState( defaultPage )

  useEffect( () => {
    // on url change map the correct component
    const _currentRoute = location.pathname.slice( 1 ).split( '/' ).shift()

    if ( kebabCase( currentPage ) !== _currentRoute ) {
      setCurrentPage( upperFirst( camelCase( _currentRoute ) ) )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ location ] )

  const goToLogin = () => navigate( '/login' )

  const getComponent = {
    ChangePassword() {
      return (
        <ChangePassword
          goToSuccessPage={ () => setCurrentPage( 'ChangePasswordSuccess' ) }
          goToLogin={ goToLogin }
        />
      )
    },
    ChangePasswordSuccess() {
      return <ChangePasswordSuccess goToLogin={ goToLogin } />
    },
    ForgotPassword() {
      return (
        <ForgotPassword
          goToSuccessPage={ () => setCurrentPage( 'ForgotPasswordSuccess' ) }
          goToLogin={ goToLogin }
        />
      )
    },
    ForgotPasswordSuccess() {
      return <ForgotPasswordSuccess goToLogin={ goToLogin } />
    },
    Login() {
      return (
        <Login
          goToForgotPassword={ () => navigate( '/forgot-password' ) }
          goToSuccessPage={ () => navigate( '/dashboard' ) }
          goToSignUp={ () => navigate( '/signup' ) }
        />
      )
    },
    Signup() {
      return <Signup goToLogin={ goToLogin } />
    },
  }

  return getComponent[currentPage]()
}

export default Auth
