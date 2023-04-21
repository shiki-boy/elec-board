import classNames from 'classnames'
import { useFieldArray } from 'react-hook-form'

import { AddIcon } from '@/assets/icons'

import Icon from '@/components/Icon'

const FormIterableItem = ( {
  control,
  name,
  IterableItemFactory,
  register,
  buttonLabel,
  nested = false,
  componentProps = {},
} ) => {
  const { fields, append, remove } = useFieldArray( {
    control,
    keyName: 'key',
    name,
  } )

  return (
    <>
      {fields.map( ( item, index ) => (
        <IterableItemFactory
          index={ index }
          key={ item.key }
          defaultValue={ item }
          { ...{
            append,
            control,
            item,
            name,
            register,
            remove,
            ...componentProps,
          } }
        />
      ) )}

      <button
        className={ classNames( {
          indented: nested,
          secondary: true,
        } ) }
        onClick={ () => append( { arbitary: 1 } ) }
        type='button'
      >
        <Icon IconComponent={ AddIcon } className='primary md' />
        {buttonLabel}
      </button>
    </>
  )
}

export default FormIterableItem
