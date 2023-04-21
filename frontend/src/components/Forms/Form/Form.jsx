import { useContext, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import UiContext from '@/context/UiContext'
import useApi from '@/hooks/useApi'

const Form = ( {
  entries,
  method,
  endpoint,
  FormBody,
  onSuccess = ( responseData ) => {},  // eslint-disable-line
  onError = ( error ) => {},  // eslint-disable-line
  showOnlyToastErrors = false,
  convertToFormData = false,
  updateUid = null,
} ) => {
  const formMethods = useForm( {
    defaultValues: entries,
    mode: 'onChange',
    shouldUnregister: false,
  } )

  const { handleSubmit, setError } = formMethods

  const { setToast } = useContext( UiContext )

  const _params = {}

  if ( updateUid ) {
    _params.updateUid = updateUid
  }

  const { isLoading, isSuccess, mutate, data, isError, error } = useApi(
    method,
    endpoint,
    _params,
  )

  useEffect( () => {
    if ( isError && null !== error ) {
      onError( error )
    }
    if ( error?.data ) {
      Object.entries( error?.data ).forEach( ( [ key, value ] ) => {
        if ( Array.isArray( value ) ) {
          // cannot submit the form again if there are errors in the form state
          if ( showOnlyToastErrors ) {
            setToast( {
              message: value[0],
              type: 'error',
            } )
          } else {
            setError( key, { message: value[0] } )
          }
        } else {
          setError( key, { message: value } )
        }
      } )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ error, isError ] )

  useEffect( () => {
    if ( isSuccess ) {
      onSuccess( data )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isSuccess, data ] )

  const onSubmit = ( values ) => {
    if ( !convertToFormData ) {
      mutate( values )
    } else {
      // used it to upload an image without using base64 conversion
      const formData = new FormData()

      for ( const key in values ) {
        // handle `null` value
        const _value = null === values[key] ? '' : values[key]

        formData.append( key, _value )
      }
      mutate( formData )
    }
  }

  return (
    <FormProvider { ...formMethods }>
      <form onSubmit={ handleSubmit( onSubmit ) }>
        <FormBody entries={ entries } isLoading={ isLoading } />
      </form>
    </FormProvider>
  )
}

export default Form
