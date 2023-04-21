import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'

import useApi from '@/hooks/useApi'
import SelectContainer from './SelectContainer'

const DynamicSelect = ( {
  endpoint,
  labelField = 'name',
  onSelect = ( option ) => {},  // eslint-disable-line
  placeholder,
  label,
  defaultValue,
  defaultSelectOne = false,
  filters = {},
  helperText,
  readOnly,
  dataKey = 'results',
  name,
  keyField = 'uuid',
  valueField = 'uuid',
  onClear = () => {},
  handleCreate = () => {},
  isCreatable = false,
  hasError = false,
  required,
} ) => {
  const [ search, setSearch ] = useState( '' )
  const [ isDefaultValueSet, setIsDefaultValueSet ] = useState( false )

  const { data, isSuccess, isLoading } = useApi( 'getList', endpoint, {
    search,
    ...filters,
  } )

  const handleSearch = ( e ) => {
    setSearch( e.target.value )
  }

  useEffect( () => {
    if ( isSuccess && !isDefaultValueSet && !isEmpty( defaultValue ) ) {
      // we need to set default value only once
      setIsDefaultValueSet( true )

      if ( 'string' === typeof defaultValue ) {
        const _data = dataKey ? data?.[dataKey] ?? [] : data ?? []

        const val = _data.find( ( d ) => d[valueField] === defaultValue )

        setSearch( val?.[labelField] ?? '' )
      } else {
        setSearch( defaultValue?.[labelField] ?? '' )
      }
    } else if ( '' === defaultValue ) {
      setSearch( '' )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isSuccess, data, defaultValue, isDefaultValueSet ] )

  useEffect( () => {
    if ( defaultSelectOne && isSuccess ) {
      const _data = dataKey ? data?.[dataKey] ?? [] : data ?? []

      const val = _data[0][labelField]

      setSearch( val ) // for the search field text
      onSelect( _data[0] )
    }
  }, [ defaultSelectOne, isSuccess ] )


  return (
    <SelectContainer
      { ...{
        handleCreate,
        handleSearch,
        hasError,
        helperText,
        isCreatable,
        isLoading,
        keyField,
        label,
        labelField,
        name,
        onClear,
        onSelect,
        options: dataKey ? data?.[dataKey] ?? [] : data ?? [],
        placeholder: placeholder ?? label,
        readOnly,
        required,
        search,
        setSearch,
      } }
    />
  )
}

export default DynamicSelect
