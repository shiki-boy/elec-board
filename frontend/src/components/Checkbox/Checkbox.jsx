import classNames from 'classnames'

import './Checkbox.scss'

const Checkbox = ( { label, small = false, ...rest } ) => (
  <div
    className={ classNames( {
      'checkbox-container': true,
      small,
    } ) }
  >
    <input type='checkbox' { ...rest } />
    <span className='checkmark'>
      {
        'string' === typeof label ? (
          <span>{label}</span>
        ) : ( label )
      }
    </span>
  </div>
)

export default Checkbox

/*
rest can be anything
1. register from react-hook-form
2. custom controlled form ( onChange, checked etc. )
*/
