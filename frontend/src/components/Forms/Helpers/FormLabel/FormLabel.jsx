import { at } from 'lodash'
import { useFormContext } from 'react-hook-form'

const FormLabel = ( { children, name, field, className, required, noLabel = false } ) => {
  const { formState } = useFormContext() || { formState: null }

  return (
    <label
      htmlFor={ name }
      className={ `form-label ${ className } ${ required && 'required' }` }
    >
      { !noLabel && <span className={ formState?.errors[name] && 'error' }>{field}</span> }
      {children}
      <span className='helper-text error'>
        {at( formState?.errors, name )[0]?.message}
      </span>
    </label>
  )
}

export default FormLabel
