import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import './ConfirmModal.scss'

const ConfirmModal = ( {
  successCallback = () => {},
  heading,
  message,
  subtext,
  customButtons = null,
  cancelButtonLabel = 'no, keep the data',
  confirmButtonLabel = 'yes, delete the data',
} ) => {
  confirmAlert( {
    customUI: ( { onClose } ) => (
      <div className='confirm-modal-container'>
        <h4>{heading}</h4>

        {!!subtext && <p>{subtext}</p>}

        <p className='message'>{message}</p>

        <div className='buttons'>
          <button className='primary' onClick={ onClose }>
            {cancelButtonLabel}
          </button>

          <button
            className='primary danger'
            onClick={ () => {
              successCallback()
              onClose()
            } }
          >
            {confirmButtonLabel}
          </button>
        </div>
      </div>
    ),
  } )
}

export default ConfirmModal
