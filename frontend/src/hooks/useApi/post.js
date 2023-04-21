import { useMutation, useQueryClient } from 'react-query'
import httpClient from './httpClient'

const Post = ( endpoint, params, config ) => {
  const queryClient = useQueryClient()

  const postQueryFunction = ( data ) =>
    new Promise( ( resolve, reject ) => {
      httpClient
        .post( `${ endpoint }/`, data, { ...config } )
        .then( ( { data } ) => {
          resolve( data )
        } )
        .catch( ( e ) => {
          reject( e )
        } )
    } )

  return useMutation( postQueryFunction, {
    // Refetch data after mutation
    onSettled: () => {
      queryClient.invalidateQueries( endpoint )
    },
  } )
}

export default Post
