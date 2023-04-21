import { useMutation, useQueryClient } from 'react-query'
import httpClient from './httpClient'

const Patch = ( endpoint, params ) => {
  const queryClient = useQueryClient()

  const patchQueryFunction = ( mutateData, id ) =>
    new Promise( ( resolve, reject ) => {
      const updateUid = params?.updateUid ?? id

      const _endpoint = updateUid ? `${ endpoint }/${ updateUid }` : endpoint

      httpClient
        .patch( `${ _endpoint }/`, { ...mutateData } )
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

      return patchQueryFunction( dataFromMutate ?? params, useId )
    },
    {
      // Refetch data after mutation
      onSettled: () => {
        queryClient.invalidateQueries( endpoint )
      },
    },
  )
}

export default Patch
