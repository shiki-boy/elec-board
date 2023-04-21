import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { startCase } from 'lodash'

import './Sidebar.scss'

// import logo from '@/assets/images/logo.svg'

import { mainPagesConf } from '@/pages'
// import Icons from '@/assets/icons/page-icons'
import AuthContext from '@/context/AuthContext'

const Sidebar = () => {
  const { userData } = useContext( AuthContext )

  return(
    <nav className='sidebar-container'>
      {/* <img className='logo' src={ logo } alt='' /> */}

      {mainPagesConf.filter( ( { roles } ) => {
        if ( roles === undefined ) {
          return true
        }
        return roles.includes( userData?.user_type )
      } ).map( ( page ) => (
        <NavLink to={ page.link } className='sidebar-nav-link' key={ page.link }>
          {/* {Icons[page.component]()} */}
          {startCase( page.title )}
        </NavLink>
      ) )}
    </nav>
  )
}

export default Sidebar
