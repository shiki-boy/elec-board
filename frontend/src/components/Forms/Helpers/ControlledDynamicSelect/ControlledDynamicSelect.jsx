import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import UiContext from '@/context/UiContext'
import { UseInvalidateEndpoint } from '@/hooks/useApi'
import DynamicSelect from '@/components/Forms/Helpers/Select/DynamicSelect'

const ControlledDynamicSelect = ( {
  name,
  label,
  labelField,
  placeholder,
  endpoint,
  onSelect = () => {},
  filters = {},
  helperText,
  readOnly,
  rules,
  dataKey,
  valueKey,
  keyField,
  isCreatable,
  CreateModal,
  onClear = () => {},
} ) => {
  const { setValue, trigger, formState } = useFormContext()

  const { openModal, closeModal, setToast } = useContext( UiContext )

  const invalidateEndpoint = UseInvalidateEndpoint()

  const handleChange = ( option ) => {
    setValue( name, option[valueKey] )
    trigger( name )
    onSelect( option, name )
  }

  const handleClear = () => {
    setValue( name, '' )
    trigger( name )
    onClear()
  }

  const handleCreate = () => {
    const Modal = () => (
      <CreateModal
        onSuccess={ ( option ) => {
          invalidateEndpoint( endpoint )

          handleChange( option )

          setToast( {
            message: `${ label } created`,
            type: 'success',
          } )

          closeModal()
        } }
      />
    )

    openModal( () => Modal )
  }

  return (
    <Controller
      name={ name }
      defaultValue={ null }
      rules={ rules }
      render={ ( { field: { onChange, onBlur, value, ref } } ) => (
        <DynamicSelect
          { ...{
            dataKey,
            defaultValue: value,
            endpoint,
            filters,
            handleCreate,
            hasError: !!formState.errors?.[name],
            helperText,
            isCreatable,
            keyField,
            label,
            labelField,
            name,
            onBlur,
            onChange,
            onClear: handleClear,
            onSelect: handleChange,
            placeholder: placeholder ?? label,
            readOnly,
            valueField: valueKey,
          } }
        />
      ) }
    />
  )
}

export default ControlledDynamicSelect
