import { useEffect, useRef } from 'react'

const useOnClickOutside = ( handler ) => {
  const ref = useRef( null )

  useEffect(
    () => {
      const listener = ( event ) => {
        if ( !ref.current || ref.current.contains( event.target ) ) {
          return
        }
        handler( event )
      }

      document.addEventListener( 'mousedown', listener )
      return () => {
        document.removeEventListener( 'mousedown', listener )
      }
    },
    // to optimize you can wrap handler in useCallback
    [ ref, handler ],
  )

  return ref
}

export default useOnClickOutside
