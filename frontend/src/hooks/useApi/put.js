import { useMutation, useQueryClient } from 'react-query'

import httpClient from './httpClient'

const Put = ( endpoint, params ) => {
  const queryClient = useQueryClient()

  const putQueryFunction = ( data, id ) =>
    new Promise( ( resolve, reject ) => {
      const updateUid = params?.updateUid ?? id

      const _endpoint = updateUid ? `${ endpoint }/${ updateUid }` : endpoint

      httpClient
        .put( `${ _endpoint }/`, data )
        .then( ( { data } ) => {
          resolve( data )
        } )
        .catch( ( e ) => {
          reject( e )
        } )
    } )

  return useMutation(
    ( dataFromMutate ) => {
      const { useId = '' } = dataFromMutate ?? {}

      return putQueryFunction( dataFromMutate ?? params, useId )
    },
    {
      // Refetch data after mutation
      onSettled: () => {
        queryClient.invalidateQueries( endpoint )
      },
    },
  )
}

export default Put
