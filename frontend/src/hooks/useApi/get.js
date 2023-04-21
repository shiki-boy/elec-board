import { useQuery } from 'react-query'
import httpClient from './httpClient'

const getQueryFunction = ( { queryKey: [ endpoint, params ] } ) =>
  new Promise( ( resolve, reject ) => {
    httpClient
      .get( `${ endpoint }/`, { params } )
      .then( ( { data } ) => {
        resolve( data )
      } )
      .catch( ( e ) => {
        reject( e )
      } )
  } )

const Get = ( endpoint, params, config ) =>
  useQuery( [ endpoint, params ], getQueryFunction, config )

export default Get
