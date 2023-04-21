import { useContext } from 'react'

import './Modal.scss'

import UiContext from '@/context/UiContext'
import { CloseIcon } from '@/assets/icons'

const Modal = () => {
  const { modal: Component, closeModal } = useContext( UiContext )

  if ( !Component ) {
    return null
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='close-btn' onClick={ closeModal }>
          <CloseIcon className='dark md pointer' />
        </div>
        <Component />
      </div>
    </div>
  )
}

export default Modal
