/* eslint-disable sort-keys */
import { createContext, useState } from 'react'

const UiContext = createContext( {} )

export const UiContextProvider = ( { children } ) => {
  const [ toast, setToast ] = useState( {} ) // takes toast object

  const removeToast = () => setToast( {} )

  const [ modal, setModal ] = useState( null )

  const openModal = ( component ) => {
    setModal( component )
  }

  const closeModal = () => {
    setModal( null )
  }

  return (
    <UiContext.Provider
      value={ {
        toast,
        setToast,
        removeToast,

        modal,
        openModal,
        closeModal,
      } }
    >
      {children}
    </UiContext.Provider>
  )
}

export default UiContext

/**
toast = {
  message: ''
  type: success | warning | info | error
  timeout?: number ( in ms )
}

 *
 */
