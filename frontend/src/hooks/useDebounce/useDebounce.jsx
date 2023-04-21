import { useCallback } from 'react'
import { debounce } from 'lodash'

const useDebounce = ( callback ) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce( ( val ) => callback( val ), 1000 ),
    [ callback ],
  )

  return debouncedSave
}

export default useDebounce
