import { useEffect, useRef, useState, useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { isObject } from 'lodash'

import './ProfilePicUploader.scss'

import UiContext from '@/context/AuthContext'
import Button from '@/components/Button'
import Avatar from '@/components/Avatar'
import Checkbox from '@/components/Checkbox'

const ProfilePicUploader = ( { name, entries, isLoading } ) => {
  const { setValue } = useFormContext()

  const { setToast } = useContext( UiContext )

  const [ picture, setPicture ] = useState( entries?.[name] )
  const [ removePic, setRemovePic ] = useState( false )

  const fileInput = useRef( null )
  const refSubmitButton = useRef( null )

  useEffect( () => {
    if ( removePic ) {
      setValue( name, null )
    } else {
      // set default again
      setValue( name, entries?.[name] )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ removePic ] )

  const handleChange = ( e ) => {
    setValue( name, e.target.files[0] )
    setPicture( e.target.files[0] )

    setTimeout( () => {
      try {
        refSubmitButton.current.click()
      } catch ( error ) {
        // trying again
        setTimeout( () => {
          if ( refSubmitButton.current ) {
            refSubmitButton.current.click()
          } else {
            setToast( {
              message: 'Something went wrong. Please try again.',
              type: 'warning',
            } )
          }
        }, 1000 )
      }
    }, 1000 )
  }

  const chooseFile = () => {
    if ( removePic ) {
      refSubmitButton.current.click()
      return
    }

    fileInput.current.click()
  }

  const getButtonTitle = () => {
    if ( removePic ) {
      return 'confirm remove ?'
    }
    return `${ !picture ? 'upload' : 'change' } profile picture`
  }

  return (
    <div className='profile-pic-uploader'>
      {!isObject( picture ) && <Avatar url={ picture } smallAvatar={ false } />}

      {isObject( picture ) && <span className='pic-name'>{picture.name}</span>}

      <input
        type='file'
        ref={ fileInput }
        name={ name }
        accept='image/*'
        onChange={ handleChange }
      />

      <Button
        title={ getButtonTitle() }
        type='button'
        color={ removePic ? 'primary' : 'secondary' }
        onClick={ chooseFile }
        isLoading={ isLoading }
        loadingText='uploading image...'
      />

      {!!picture && (
        <Checkbox
          label='Remove profile picture'
          checked={ removePic }
          onChange={ () => setRemovePic( ( old ) => !old ) }
          small
        />
      )}

      <button hidden={ true } ref={ refSubmitButton } type={ 'submit' } />
    </div>
  )
}

export default ProfilePicUploader
