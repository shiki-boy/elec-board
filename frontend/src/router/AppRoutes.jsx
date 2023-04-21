import { useContext } from 'react'
import { useRoutes, Navigate } from 'react-router-dom'

import AppLayout from '@/layouts/AppLayout'
import AuthLayout from '@/layouts/AuthLayout'
import pages, { mainPagesConf } from '@/pages'
import Auth from '@/pages/Auth'
import AuthContext from '@/context/AuthContext'

const AppRoutes = () => {
  const { userData } = useContext( AuthContext )

  const createRouteProps = ( pagesConf ) =>
    pagesConf
      .filter( ( { roles } ) => {
        if ( roles === undefined ) {
          return true
        }
        return roles.includes( userData?.user_type )
      } )
      .map( ( { component, link, roles } ) => {
        if ( roles !== undefined && !roles.includes( userData?.user_type ) ) {
          return
        }

        const Element = pages[component]

        return {
          element: <Element />,
          path: `${ link }/*`,
        }
      } )

  const appPages = createRouteProps( mainPagesConf )

  const element = useRoutes( [
    {
      children: [
        {
          element: <Navigate to='/dashboard' />,
          path: '',
        },
        ...appPages,
        {
          element: <Navigate to='/dashboard' />,
          path: '*',
        },
      ],
      element: <AppLayout />,
    },
    {
      children: [
        {
          element: <Auth defaultPage='Login' />,
          path: '/login',
        },
        {
          element: <Auth defaultPage='Signup' />,
          path: '/signup',
        },
      ],
      element: <AuthLayout />,
    },
  ] )

  return element
}

export default AppRoutes
