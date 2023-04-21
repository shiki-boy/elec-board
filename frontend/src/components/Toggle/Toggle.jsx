import './Toggle.scss'

const Toggle = ( { label, onClick, ...rest } ) => (
  <div className='toggle-container'>
    <span>{label}</span>
    <input className='toggle' id='cb1' type='checkbox' { ...rest } />
    <label className='toggle-btn' htmlFor='cb1' onClick={ onClick } />
  </div>
)

export default Toggle
