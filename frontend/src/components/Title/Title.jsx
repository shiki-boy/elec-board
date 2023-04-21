import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { startCase } from 'lodash'

const Title = () => {
  const location = useLocation()

  const currentTitle = location.pathname
    .slice( 1 )
    .split( '/' )
    .shift()

  return (
    <Helmet>
      <title>
        {currentTitle ? `${ startCase( currentTitle ) } - ` : ''} EB
      </title>
    </Helmet>
  )
}

export default Title
