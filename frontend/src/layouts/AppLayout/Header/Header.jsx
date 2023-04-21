import { useContext } from 'react'

import './Header.scss'

import AuthContext from '@/context/AuthContext'

const Header = () => {
  const { userData } = useContext( AuthContext )

  return (
    <div className='header-container'>
      <div className='username' data-name={ userData?.full_name[0] }>
        {userData?.full_name}
        <br />
      </div>
    </div>
  )
}

export default Header
