import del from './delete'
import get from './get'
import getList from './getList'
import patch from './patch'
import post from './post'
import put from './put'

const useApi = ( method, endpoint, params = undefined, config = null ) => {
  if( !method || ! endpoint ) {
    throw new Error( 'API must be called with method and endpoint parameters' )
  }
  const methods = {
    delete: del,
    get,
    getList,
    patch,
    post,
    put,
  }

  // polymorphic call
  return methods[ method ]( endpoint, params, config )
}

export default useApi