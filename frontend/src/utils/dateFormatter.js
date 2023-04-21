import { format } from 'date-fns'

const dateFormatter = ( data ) => {
  if ( !data ) return '-'
  return format( new Date( data ), 'MM-dd-yyyy' )
}

export default dateFormatter