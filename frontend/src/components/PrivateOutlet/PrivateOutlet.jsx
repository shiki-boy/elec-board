import { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { isEmpty } from 'lodash'

import AuthContext from '@/context/AuthContext'

const PrivateRoute = () => {
  const { userData, fetchUserData } = useContext( AuthContext )

  useEffect( () => {
    if ( !userData ) {
      fetchUserData()
    }
  }, [ userData, fetchUserData ] )

  if ( isEmpty( userData ) ) {
    return null
  }

  return <Outlet />
}

export default PrivateRoute
