import { isEmpty, isObject } from 'lodash'
import { memo, useState } from 'react'

import SelectContainer from './SelectContainer'

const Select = ( {
  defaultOptions = [],
  labelField = 'name',
  onSelect = ( option ) => {},  // eslint-disable-line
  placeholder,
  label,
  defaultValue = {},
  keyField,
  valueField = 'value',
  hasError = false,
  name,
  onClear,
  readOnly,
} ) => {
  const getDefaultValue = ( val ) => {
    if ( 'object' === typeof val && isEmpty( val ) ) return ''
    else if ( isObject( val ) ) return defaultValue[labelField]
    else if ( 'string' === typeof val || 'number' === typeof val ) {
      const fieldVal = defaultOptions.find( ( d ) => d[valueField] === val )

      return fieldVal[labelField]
    }

    return ''
  }

  const [ search, setSearch ] = useState( getDefaultValue( defaultValue ) )
  const [ options, setOptions ] = useState( defaultOptions )

  const handleSearch = ( e ) => {
    const val = e.target.value

    setSearch( val )

    if ( !val ) {
      setOptions( defaultOptions )
      return
    }

    const results = options.filter(
      ( opt ) => -1 !== opt[labelField].toLowerCase().indexOf( val.toLowerCase() ),
    )

    setOptions( results )
  }

  return (
    <SelectContainer
      { ...{
        handleSearch,
        hasError,
        keyField,
        label,
        labelField,
        name,
        onClear,
        onSelect,
        options,
        placeholder: placeholder ?? label,
        readOnly,
        search,
        setSearch,
      } }
    />
  )
}

export default memo( Select )
