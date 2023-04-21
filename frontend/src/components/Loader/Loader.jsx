import classNames from 'classnames'

import './Loader.scss'

const Loader = ( { message = 'Fetching content...', fullPage } ) => (
  <div
    className={ classNames( {
      'full-page': fullPage,
      'loader-container': true,
    } ) }
  >
    <div className='loader'></div>
    <h4>{message}</h4>
  </div>
)

export default Loader
