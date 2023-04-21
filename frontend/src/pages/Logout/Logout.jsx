import { useNavigate } from 'react-router-dom'

import './Logout.scss'

import useLogout from '@/hooks/useLogout/useLogout'
import Button from '@/components/Button/Button'

const Logout = () => {
  const navigate = useNavigate()
  const { logout } = useLogout()

  return(
    <div className='logout-page'>
      <div>
        <h4>Are you sure you want to logout?</h4>

        <div className='buttons'>
          <Button title='Confirm' color='primary' onClick={ logout } />

          <Button
            title='Cancel'
            color='secondary'
            onClick={ () => navigate( '/dashboard' ) }
          />
        </div>
      </div>
    </div>
  )
}

export default Logout