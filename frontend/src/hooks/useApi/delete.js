import {
  useMutation,
  useQueryClient,
} from 'react-query'
import httpClient from './httpClient'

const Del = ( endpoint, extraRefetchURL = null ) => {
  const queryClient = useQueryClient()

  const deleteQueryFunction = ( param ) => new Promise( ( resolve, reject ) => {
    httpClient.delete( `${ endpoint }/${ param }/` )
      .then( ( { data } ) => {
        resolve( data )
      } )
      .catch( ( e ) => {
        reject( e )
      } )
  } )

  return useMutation( deleteQueryFunction, {
    mutationKey: endpoint,
    onSuccess: () => {
      queryClient.invalidateQueries( endpoint )
      if( extraRefetchURL ) {
        queryClient.invalidateQueries( extraRefetchURL )
      }
    },
  } )


}

export default Del