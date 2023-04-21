import { useContext, useEffect, useState, useRef } from 'react'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

import './ToastMessage.scss'

import UiContext from '@/context/UiContext'

const ToastMessage = () => {
  const {
    toast: { message, type, timeout = 5000 },
    removeToast,
  } = useContext( UiContext )

  const ref = useRef()

  const [ showToast, setShowToast ] = useState( false )

  useEffect( () => {
    if ( message ) {
      setShowToast( true )
      setTimeout( () => {
        removeToast()
      }, timeout )
    } else {
      setShowToast( false )
    }
  }, [ message, removeToast, timeout ] )

  return (
    <CSSTransition
      appear
      classNames='toast-alert'
      in={ showToast }
      unmountOnExit
      timeout={ 5000 }
      nodeRef={ ref }
    >
      <div
        className={ classNames( {
          toast: true,
          [type]: true,
        } ) }
        onClick={ removeToast }
        ref={ ref }
      >
        {message}
      </div>
    </CSSTransition>
  )
}

export default ToastMessage
