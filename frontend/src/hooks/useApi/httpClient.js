import { refreshTokenURL } from '@/router/apiEndpoint'
import axios from 'axios'
import Cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'

const config = {
  headers: {
    Authorization: Cookie.get( 'Authorization' ),
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
  },
}

const httpClient = axios.create( config )

httpClient.interceptors.request.use(
  async ( config ) => {
    if (
      [
        '/check',
        '/login',
        '/register',
        '/logout',
      ].some( ( v ) => config.url.match( new RegExp( v ) ) )
    ) {
      return config
    }

    const refreshToken = Cookie.get( 'refresh' )

    // refresh token
    try {
      if ( !Cookie.get( 'Authorization' ) ) {
        const { data } = await axios.post( refreshTokenURL, { refresh: refreshToken } )

        const accessTokenExpires = new Date( jwtDecode( data.access ).exp * 1000 )

        Cookie.set( 'Authorization', `Bearer ${ data.access }`, { expires: accessTokenExpires } )

        httpClient.defaults.headers['Authorization'] = `Bearer ${ data.access }`
        config.headers['Authorization'] = `Bearer ${ data.access }`
      }
    } catch ( error ) {
      Cookie.remove( 'Authorization' )
      Cookie.remove( 'refreshToken' )
      httpClient.defaults.headers['Authorization'] = null
      config.headers['Authorization'] = null
    }

    return config
  },
  function ( error ) {
    // console.log( error )
    // Do something with request error
    return Promise.reject( error )
  },
)

httpClient.interceptors.response.use(
  ( response ) => response,
  ( error ) => {
    if (
      401 === error.response.status
      || ( 403 === error.response.status
        && 'Invalid token.' === error.response.data.detail )
    ) {
      delete httpClient.defaults?.headers['Authorization']
      Cookie.remove( 'Authorization' )

      const index = window.location.hostname.indexOf( '.' )
      const domain = window.location.hostname.slice( index )

      Cookie.remove( 'Authorization', {
        domain,
        path: '/',
      } )

      // window.location.href = `${ import.meta.env.VITE_REDIRECT_BASE_URL }?next=${ window.location.pathname }`
    }
    return Promise.reject( error.response )
  },
)

export default httpClient
