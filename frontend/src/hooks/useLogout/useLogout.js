import { useContext } from 'react'
import Cookie from 'js-cookie'

import useApi from '@/hooks/useApi'
import httpClient from '@/hooks/useApi/httpClient'
import AuthContext from '@/context/AuthContext'
import { logoutURL } from '@/router/apiEndpoint'
import { useNavigate } from 'react-router-dom'

const useLogout = () => {
  const navigate = useNavigate()

  const { setUserData } = useContext( AuthContext )

  const { mutateAsync, isError } = useApi( 'post', logoutURL )

  const deleteCookies = () => {
    delete httpClient.defaults?.headers['Authorization']
    // if suppose AuthContext is not available

    Cookie.remove( 'Authorization' )

    if ( setUserData ) {
      setUserData( null )
    }

    Cookie.remove( 'Authorization', { path: '/' } )

    Cookie.remove( 'refreshToken', { path: '/' } )

    navigate( '/login' )
  }

  const logout = () => {
    mutateAsync().then( () => {
      deleteCookies()
    } )
  }

  return {
    deleteCookies,
    error: isError,
    logout,
  }
}

export default useLogout
