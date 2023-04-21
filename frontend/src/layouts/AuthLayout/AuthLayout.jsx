import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import './AuthLayout.scss'

import classNames from 'classnames'

const AuthLayout = () => {
  useEffect( () => {
    // if someone directly goes to /login don't allow to be on a sub-domain
    // const baseURL = new URL( import.meta.env.VITE_REDIRECT_BASE_URL )

    // if ( window.location.hostname !== baseURL.hostname ) {
    //   window.location.href = baseURL.origin + window.location.pathname
    // }
  }, [] )

  return(
    <div
      className={ classNames(
        'auth-layout',
      ) }
    >
      <div className='auth-content'>
        <div className='auth-card'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
