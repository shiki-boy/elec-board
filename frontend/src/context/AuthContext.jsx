/* eslint-disable sort-keys */
import { createContext, useEffect, useState } from 'react'

import useApi from '@/hooks/useApi'
import useLogout from '@/hooks/useLogout'

const AuthContext = createContext( {} )

export const AuthContextProvider = ( { children } ) => {
  const { deleteCookies } = useLogout()

  // const getAuthCookie = () => Cookies.get( 'Authorization' )

  const [ userData, setUserData ] = useState( null )

  const { data, refetch, isSuccess, isLoading, isError } = useApi(
    'get',
    '/api/auth/user-info',
    null,
    {
      enabled: false,
      retry: false,
    },
  )

  useEffect( () => {
    if ( isSuccess ) {
      setUserData( data )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isSuccess, data ] )

  useEffect( () => {
    if ( isError ) {
      deleteCookies()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isError ] )

  // const isLoggedIn = () => !!getAuthCookie()

  return (
    <AuthContext.Provider
      value={ {
        fetchingUserInfoLoading: isLoading,
        fetchingUserInfoSuccess: isSuccess,
        fetchUserData: refetch,
        refreshUser: refetch,
        // isLoggedIn,
        setUserData,
        userData,

      } }
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

/*
  userData: {
    info: {
    email: '',
    avatar: '',
    full_name: 'first last',
    short_name: 'last f.',
    registered_at: '00:23 27.11.2021',
    totp_enabled: true,
    },

    loginAttempt: {
      "uuid": "",
      "password_authenticated": true,
      "sms_authenticated": false,
      "totp_authenticated": false,
      "user_identity": null | {
        "token": "af9332fda008bed6e494a6481994bd1b81c784b2",
        "domain": "http://client1.alinea-dev.io"
      }
    }
  }
 */
