import { kebabCase } from 'lodash'

import Applications from './Applications'
import Dashboard from './Dashboard'
import Logout from './Logout'

export default {
  Applications,
  Dashboard,
  Logout,
}

const createPagesConf = ( pagesList ) =>
  pagesList.map( ( { name, roles, ...rest } ) => ( {
    component: name,
    link: kebabCase( name ),
    roles,
    title: kebabCase( name ).split( '-' ).join( ' ' ),
    ...rest,
  } ) )

const mainPages = [
  { name: 'Dashboard' },
  { name: 'Applications' },
  { name: 'Logout' },
]

export const mainPagesConf = createPagesConf( mainPages )
